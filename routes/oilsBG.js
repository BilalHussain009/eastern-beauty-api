const { OilBG, validate } = require("../models/oilBG");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const oilsBG = await OilBG.find().select("-__v").sort("name") ;
  res.send(oilsBG);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const oilBG = await OilBG.findById(req.params.id).select("-__v");

  if (!oilBG)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oilBG);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const oilBG = new OilBG({
      
    name: req.body.name,
    synonims: req.body.synonims,
    tags:req.body.tags,
    location: req.body.location,
    usedParts:req.body.usedParts,
    chemicalIngredients: req.body.chemicalIngredients,
    disclaimers: req.body.disclaimers,
    extractionMethods: req.body.extractionMethods,
    combinations: req.body.combinations,
    usage: req.body.usage
  });
  await oilBG.save();

  res.send(oilBG);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const oilBG = await OilBG.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      synonims: req.body.synonims,
      tags: req.body.tags,
      location: req.body.location,
      usedParts: req.body.usedParts,
      chemicalIngredients: req.body.chemicalIngredients,
      disclaimers: req.body.disclaimers,
        extractionMethods: req.body.extractionMethods,
        combinations: req.body.combinations,
      usage: req.body.usage
    },
    { new: true }
  );

  if (!oilBG)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oilBG);
});


router.delete("/:id", [auth, admin], async (req, res) => {
  const oilBG = await OilBG.findByIdAndRemove(req.params.id);

  if (!oilBG)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oilBG);
});

module.exports = router;
