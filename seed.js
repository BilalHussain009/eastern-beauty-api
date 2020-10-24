const { Herb } = require("./models/herb");
const mongoose = require("mongoose");
const config = require("config");

const herbs = [
 { name: "First Herb",
  synonims: [
      "First Synonim", "Second synonim"
  ],
  tags:[
    "First tag", "Second tag"
  ],
  location: "This herb can be found...",
  usedParts:[
      "First part", "Second part"
  ],
  chemicalIngredients: [
      "First chemical ingredient", "Second chemical ingredient"
  ],
  usage: {
    effect: "Effect of the herb",
    whenToUseIt: "Use it when...",
    howToUseIt: "Use it with...",
    warnings: "Warning!"
  }}
]

async function seed() {
  await mongoose.connect(config.get("db"));
  await Herb.deleteMany({});

  const addHerbs = herbs.map(herb=>({
    ...herb
  })) 
  
  await Herb.insertMany(addHerbs);
  
  mongoose.disconnect();

  console.info("Done!");
}

seed();
