const Joi = require('joi');
const mongoose = require('mongoose');

const HerbBG = mongoose.model('HerbBG', new mongoose.Schema({
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

function validateHerbBG(herbBG) {
  const schema = Joi.object( {
    name: Joi.string().required(),
    synonims: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    location: Joi.array().items(Joi.string()),
    usedParts: Joi.array().items(Joi.string()),
    chemicalIngredients: Joi.array().items(Joi.string()),
    usage: Joi.object()
  });

  return schema.validate(herbBG);
}

exports.HerbBG = HerbBG; 
exports.validate = validateHerbBG;