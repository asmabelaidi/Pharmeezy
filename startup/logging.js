const winston = require('winston')
require('express-async-errors')
require('winston-mongodb')

module.exports = function (){
            // winston handle exceptions 

            winston.ExceptionHandler(
                new winston.transports.Console({colorize: true, prettyPrint: true}), 
                new winston.transports.File ({filename: 'uncaughtExceptions.log'})
                )

            // Uncaught exception
    
            process,on('uncaughtException', (ex)=>{
                console.log('WE GOT AN UNCAUGHT EXCEPTION');
                winston.error(ex.message, ex)
            })
    
            //unhandled Promise Rejections 
    
            process,on('unhandledRejection', (ex)=>{
                throw ex // winston exceptionhandler gonna catch it and display it 

            })
    
    
            // add transport to winston 
    
            winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    
            // add Mongodb to winston 
            winston.add(winston.transports.MongoDB, {
                db: 'mongodb://127.0.0.1:27017/vidlydb',
                level : 'info'
                
            })
}