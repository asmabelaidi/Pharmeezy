
const config = require('configg')

module.exports = function () {
  
    if(!config.get('jwtPrivateKey')){
       throw new Error('FATAL ERROR: jwtPrivateKey is Not defined')
    }
    // console.log(config)
} 