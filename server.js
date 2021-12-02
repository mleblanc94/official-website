const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'your_database_user',
      password : 'your_database_password',
      database : 'myapp_test'
    }
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: "123",
            name: "John",
            username: "john69",
            password: "cookies",
            joined: new Date()
        },
        {
            id: "124",
            name: "Sally",
            username: "sally@gmail.com",
            password: "bananas",
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=> {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.username === database.users[0].username &&
        req.body.password === database.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
        console.log(firstName, lastName, username, password);
    });
    database.users.push({
        id: "125",
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        joined: new Date()
    })
    res.json('success');
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
       if (user.id === id) {
           found = true;
           return res.json(user);
       }
       })
       if (!found) {
           res.status(400).json('not found')
       }
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});

