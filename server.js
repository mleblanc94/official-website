const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const database = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> { res.send(database.users)});

app.post('/signin', (req, res) => {
    database.select('username','password').from('users')
    .where('username', '=', req.body.username)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (isValid) {
            return database.select('*').from('users')
            .where('username', '=', req.body.username)
            .then(user => {
                res.json(user[0])
            })
            .catch(err => res.status().json('Unable to get the user'))
        } else {
        res.status(400).json()
        }
    })
    .catch(err => res.status(400).json('wrong credentials'))
})

app.post('/register', (req, res) => {
    const { firstName, lastName, username, password } = req.body;
    const hash = bcrypt.hashSync(password);
    database('users')
    .returning('*')
    .insert({
        firstname: firstName,
        lastname: lastName,
        username: username,
        password: hash,
        joined: new Date()
    })
    .then(user => {
        res.json(user[0]);
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

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));

