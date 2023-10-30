const mongoose = require('mongoose')
const winston = require('winston')

module.exports = function (){
    //Connect to the DB 
    const dbURL = 'mongodb://127.0.0.1:27017/pharmezydb';
    mongoose.connect(`${dbURL}`)
            .then(() => { winston.info(`Connected to MongoDB at ${dbURL}`);})

}