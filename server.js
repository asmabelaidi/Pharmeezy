const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const { getUser } = require('./utils')
const bodyParser = require('body-parser')
const { medicines } = require('./data')
const medicineRouter = require('./routes/medicines')

app.use(cors())

const SECRET = 'somesecret'

//Connect to the DB 
const dbURL = 'mongodb://127.0.0.1:27017/pharmezydb';
mongoose.connect(`${dbURL}`)
        .then(() => { console.log(`Connected to MongoDB at ${dbURL}`);})
        .catch((err) => {console.error(`MongoDB connection error: ${err}`);});


app.use(express.json())

app.use('/api/medicines', medicineRouter)
app.get('/', (req, res) => {
    return res.status(200).json({time: new Date()})
})


app.use(bodyParser.json())

app.get('/products', (req, res)=>{
     return res.json({medicines});
})

app.listen(8000, ()=>{
    console.log('Server is listening on http://localhost:8000')
})