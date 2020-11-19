const Joi = require('joi');
const mongoose = require('mongoose');

const Herb = mongoose.model('Herb', new mongoose.Schema({
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
  location: {
      type: String,
      required: true
  },
  usedParts:[
      String
  ],
  chemicalIngredients: [
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

function validateHerb(herb) {
  const schema = Joi.object( {
    name: Joi.string().required(),
    synonims: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    location: Joi.string(),
    usedParts: Joi.array().items(Joi.string()),
    chemicalIngredients: Joi.array().items(Joi.string()),
    usage: Joi.object()
  });

  return schema.validate(herb);
}

exports.Herb = Herb; 
exports.validate = validateHerb;