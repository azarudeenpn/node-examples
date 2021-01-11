const express = require('express')
const app = express()

const port = 3000

var users = {}

app.get('/signup', (req, res) => {
    let username = req.query.username
    if (username in users) {
        res.send(`username "${username}" already exists.. Please try another one..`)

    } else {
        users[username] = {
            'firstname': req.query.firstname,
            'lastname': req.query.lastname,
            'password': req.query.password
        }
        res.send('user created')
    }

})

app.get('/login', (req, res) => {
    let username = req.query.username
    let user = users[username]
    if (user) {
        if (user.password == req.query.password) {
            res.send(`Welcome back ${user.firstname} ${user.lastname} !!`)
        } else {
            res.send('username or password incorrect!')
        }
    } else {
        res.send('username or password incorrect!')
    }

})

app.get('/list', (req, res) => {
    let userlist = []
    for (var key in users) {
        userlist.push(key)
    }
    if (userlist.length != 0) {
        res.json({ 'users': userlist })
    } else {
        res.send('no registered users!')
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})