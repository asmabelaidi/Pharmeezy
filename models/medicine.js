const mongoose = require('mongoose');
const Joi = require('joi');

// Define the Medicine schema
const validMedicineTypes = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops', 'Powder', 'Other'];

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  picture: String, 
  availability: {
    type: Boolean, 
    required: true,
  },
  type: {
    type: [String], 
    enum: validMedicineTypes, 
  },
  upc: {
    type: String,
    unique: true, 
    //  required: true, 
  },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Joi schema for validation

function validateMedicine(params) {
  const schema = Joi.object({
    name: Joi.string().required(),
    dosage: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string(),
    picture: Joi.string(),
    availability: Joi.boolean().required(),
    type: Joi.string().valid(...validMedicineTypes),
    upc: Joi.string().alphanum().min(12).max(12).optional(),
  })
 return schema.validate(params)
}

// joi schema for update 
function validateUpdateMedicine(params) {
  const schema = Joi.object({
    name: Joi.string().optional(),
    dosage: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    picture: Joi.string().optional(),
    availability: Joi.boolean().optional(),
    type: Joi.string().valid(...validMedicineTypes).optional(),
    upc: Joi.string().alphanum().min(12).max(12).optional(),
  })
 return schema.validate(params)
}

module.exports = {
  Medicine,
  validateMedicine,
  validateUpdateMedicine,
};
