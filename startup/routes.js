
const { medicines } = require('./data')
const medicineRouter = require('./routes/medicines')

module.exports = function (app){

    app.use('/api/medicines', medicineRouter)
    app.get('/', (req, res) => {
        return res.status(200).json({time: new Date()})
    })

    app.get('/products', (req, res)=>{
        return res.json({medicines});
})
}