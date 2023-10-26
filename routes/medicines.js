const express = require('express')
const route = express.Router()
const  {Medicine,validateMedicine, validateUpdateMedicine} = require('../models/medicine')


route.get('/', async (req, res) =>{
    const medicines = await Medicine.find()
                                    .select('-__v -_id')
    return res.send(medicines)
})

route.get('/upc', async (req, res) =>{
    const medicine = await Medicine.find({upc: req.params.upc})
    if(medicine.length == 0) return res.status(404).send('this medicine Does not exist')
    return res.send(medicine)
})

// ADD New Medicine 

route.post('/', async (req, res) => {
    const  {name, dosage, price, description, picture, availability, type, upc} = req.body
    const {error} = validateMedicine(req.body)
    if(error) return res.status(400).send(error)
    const medicine = await Medicine.findOne({upc: upc})
    console.log(medicine);
    if(medicine) return res.status(400).send('This Medicine Already exists')
    // Create new medicine 
    const newMedicine = new Medicine({
        name, 
        dosage, 
        price, 
        description, 
        picture, 
        availability, 
        type, 
        upc
    })
    try {
        const result = await newMedicine.save()
        res.send(result) 
        
    } catch (ex) {
        let errArray = []
        for (const field in ex.errors) {
           errArray.push(ex.errors[field].message)
        }
        res.send(errArray) ;
    }
})

//UPDATE medicine 

route.put('/:upc', async (req, res) =>{
    const medicine = await Medicine.findOne({upc: req.params.upc}) 
    if(!medicine) return res.status(404).send('Medicine Does not exist')
    const {error}  = validateUpdateMedicine(req.body)
    if(error) return res.status(400).send(error)
    // update medecine 
    for (const prop in req.body) {
        medicine[prop] = req.body[prop];
      }
    medicine.save().then(result => res.json({ message: 'Medicine updated successfully' }));
   
})

// DELETE medicine

route.delete('/:upc', async (req, res) =>{
    const medicine = await Medicine.findOne({upc: req.params.upc}) 
    if(!medicine) return res.status(404).send('Medicine Does not exist')
    const removedMedicine = await Medicine.findByIdAndRemove({_id: medicine.id})
    res.send(removedMedicine) 
})

module.exports = route