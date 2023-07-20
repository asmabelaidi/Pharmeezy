const jwt = require('jsonwebtoken')

const secret = 'somesecret'

const data = {
    username: 'asmabelaidi',
    firstname: 'Asma',
    lastname: 'Belaidi'
}

const signed = jwt.sign(data, secret)

console.log({signed})

// signed is returned from backend

// How to decode signed in frontend using jwt without secret
const decoded = jwt.decode(signed)

console.log({decoded})

// From login (username, password)
// Login access point (backend developer -> frontend developer)
// fetch, axios