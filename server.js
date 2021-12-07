const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'Garfield20',
      database : 'officialwebsite'
    }
  });

database.select('*').from('users').then(data => {
    console.log(data);
  });


const app = express();
app.use(bodyParser.json());
app.use(cors());

// const database = {
//     users: [
//         {
//             id: "123",
//             name: "John",
//             username: "john69",
//             password: "cookies",
//             joined: new Date()
//         },
//         {
//             id: "124",
//             name: "Sally",
//             username: "sally@gmail.com",
//             password: "bananas",
//             joined: new Date()
//         }
//     ]
// }

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
    database('users')
    .returning('*')
    .insert({
        firstname: firstName,
        lastname: lastName,
        username: username,
        password: password,
        joined: new Date()
    })
    .then(user => {
        res.json(user);
    })
    .catch(err => res.status(400).json("unable to register"))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.select('*').from('users').where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('not found')
        }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});

