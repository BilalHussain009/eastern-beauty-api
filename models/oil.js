const Joi = require('joi');
const mongoose = require('mongoose');

const Oil = mongoose.model('Oil', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  synonims: [
      String
  ],
  tags:[
    String
  ],
  location: [
      String,
  ],
  usedParts:[
      String
  ],
  chemicalIngredients: [
      String
  ],
  disclaimers: [
      String
  ],
  extractionMethods: [
      String
  ],
  combinations : [
      String
  ],
  usage: {
    whenToUseIt: [
        String
    ],
    howToUseIt: {
        type: String
    },
    warnings: {
        type: String
    }
  }

}));

function validateOil(oil) {
  const schema = Joi.object( {
    name: Joi.string().required(),
    synonims: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    location: Joi.array().items(Joi.string()),
    usedParts: Joi.array().items(Joi.string()),
    chemicalIngredients: Joi.array().items(Joi.string()),
    disclaimers: Joi.array().items(Joi.string()),
    extractionMethods: Joi.array().items(Joi.string()),
    combinations: Joi.array().items(Joi.string()),
    usage: Joi.object()
  });

  return schema.validate(oil);
}

exports.Oil = Oil; 
exports.validate = validateOil;