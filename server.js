const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

//routes
require('./startup/routes')(app)

//db 
require('./startup/db')();

//logging
require('./startup/logging')()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.listen(8000, ()=>{
    console.log('Server is listening on http://localhost:8000')
})