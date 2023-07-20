const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const { getUser } = require('./utils')

app.use(cors())

const SECRET = 'somesecret'

app.get('/', (req, res) => {
    return res.status(200).json({time: new Date()})
})

const bodyParser = require('body-parser')
const { users } = require('./data')
app.use(bodyParser.json())

app.post('/login', (req, res) => {
  console.log({req})
     const { email, password } = req.body;
     console.log(`${email} and ${password}`);
    const currentUser = getUser(email, password, users)
    if(currentUser){
        const current_user = JSON.parse(JSON.stringify(currentUser))
        delete current_user.password
        const token = jwt.sign({...current_user}, SECRET)
        return res.status(200).json({token})
    } else {
        return res.status(404).json({error: 'User not found'})
    }
})
app.listen(8000, ()=>{
    console.log('Server is listening on http://localhost:8000')
})