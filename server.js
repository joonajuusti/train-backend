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
  },
];

app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users'), (req, res) => {
  users.push(req.body);
  res.json(req.body);
}

app.listen(8080, () => console.log("Server listening port 8080"));
