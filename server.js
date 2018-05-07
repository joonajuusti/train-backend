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

const routes = [];

const locomotives = [
  { id: 'UTU666' },
  { id: 'JEJ812' }
];

const railroadCars = [
  {
    modelName: 'RRC1',
    numberOfRows: 10
  },
  {
    modelName: 'RRC2',
    numberOfRows: 15
  }
];

const trains = [];

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
  let user = users.find(item => {
    return item.username == req.body.username
  })
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

app.listen(8080, () => console.log("Server listening port 8080"));
