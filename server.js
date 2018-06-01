const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

const users = [
  {
    firstName: 'admin',
    lastName: 'admin',
    username: 'admin',
    password: 'admin',
    admin: true,
    creditCard: '1234',
    address: 'Admin Street 1'
  },
  {
    firstName: 'user',
    lastName: 'user',
    username: 'user',
    password: 'user',
    admin: false,
    creditCard: '4321',
    address: 'User Avenue 1'
  }
];

const locomotives = [
  { id: 'UTU666' },
  { id: 'JEJ812' }
];

const railroadCars = [
  {
    modelName: 'RRC1',
    numberOfRows: 4
  },
  {
    modelName: 'RRC2',
    numberOfRows: 6
  }
];

const trains = [
  {
    name: 'T1',
    locomotive: 'UTU666',
    railroadCar: {
      modelName: 'RRC1',
      numberOfRows: 4
    },
    railroadCarAmount: 2
  },
  {
    name: 'T2',
    locomotive: 'UTU666',
    railroadCar: {
      modelName: 'RRC2',
      numberOfRows: 6
    },
    railroadCarAmount: 3
  }
];

const routes = [];

const dummyDepartureCities = ['TURKU', 'TAMPERE'];
const dummyArrivalCities = ['HELSINKI', 'JYVÄSKYLÄ'];

let route;
let train;
let departureCity;
let arrivalCity;
let dateNow = new Date();
let routeDate;

for(let i = 0; i < 1000; i++) {
  route = {};
  train = trains[Math.floor(Math.random() * 2)];
  departureCity = dummyDepartureCities[Math.floor(Math.random() * 2)];
  arrivalCity = dummyArrivalCities[Math.floor(Math.random() * 2)];
  routeDate = new Date(dateNow.valueOf() + Math.floor(Math.random() * 604800000))

  route['train'] = train;
  route['departureCity'] = departureCity;
  route['arrivalCity'] = arrivalCity;
  route['departureTime'] = routeDate;
  route['arrivalTime'] = new Date(routeDate.valueOf() + Math.floor(Math.random() * 4800000 + 600000));
  route['pricePerSeat'] = Math.floor(Math.random() * 10 + 1)
  route['wayStations'] = null;
  route['availableSeats'] = train.railroadCarAmount * train.railroadCar.numberOfRows * 6;
  route['seatsTaken'] = new Array(train.railroadCarAmount);
  for(let num = 0; num < route.seatsTaken.length; num++) {
    route.seatsTaken[num] = [];
  }
  route['id'] = i;
  routes.push(route);
}

console.log(routes)

const purchases = [];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  users.push(req.body);
  res.json(req.body);
});

app.put('/users', (req, res) => {
  let user = users.find(user => {
    return user.username === req.body.username
  });
  user.password = req.body.password;
  user.creditCard = req.body.creditCard;
  user.address = req.body.address;
  res.json(req.body);
});

app.post('/routes', (req, res) => {
  routes.push(req.body);
  res.json(req.body);
});

app.get('/routes', (req, res) => {
  res.json(routes);
});

app.put('/routes', (req, res) => {
  let route = routes.find(route => {
    return route.id === req.body.id;
  });
  route.seatsTaken = req.body.seatsTaken;
  route.availableSeats = req.body.availableSeats;
  res.json(req.body);
})

app.get('/locomotives', (req, res) => {
  res.json(locomotives);
});

app.post('/locomotives', (req, res) => {
  locomotives.push(req.body);
  res.json(req.body);
});

app.get('/railroadcars', (req, res) => {
  res.json(railroadCars);
});

app.post('/railroadcars', (req, res) => {
  railroadCars.push(req.body);
  res.json(req.body);
});

app.get('/trains', (req, res) => {
  res.json(trains);
});

app.post('/trains', (req, res) => {
  trains.push(req.body);
  res.json(req.body);
});

app.get('/purchases', (req, res) => {
  res.json(purchases);
});

app.post('/purchases', (req, res) => {
  purchases.push(req.body);
  res.json(req.body);
});

app.put('/purchases', (req, res) => {
  let reqString = JSON.stringify(req.body);
  let purchase = purchases.find(purchase => {
    return JSON.stringify(purchase) == reqString;
  });
  let index = purchases.indexOf(purchase);
  purchases.splice(index, 1);

  let route = routes.find(route => {
    return route.id === req.body.route.id;
  });
  let railroadCarNumber = purchase.railroadCarNumber;
  console.log(route);
  for(let seatNumber of purchase.seats) {
    let seatIndex = route.seatsTaken[railroadCarNumber].indexOf(seatNumber);
    route.seatsTaken[railroadCarNumber].splice(seatIndex, 1);
    route.availableSeats++;
  }
  res.json(req.body);
});

app.listen(8080, () => console.log("Server listening port 8080"));
