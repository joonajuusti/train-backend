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
    admin: true
  },
  {
    firstName: 'user',
    lastName: 'user',
    username: 'user',
    password: 'user',
    admin: false
  }
];

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
  users.find(item => {
    return item.username == req.body.username
  }).password = req.body.password;
  res.json(req.body);
})

app.listen(8080, () => console.log("Server listening port 8080"));
