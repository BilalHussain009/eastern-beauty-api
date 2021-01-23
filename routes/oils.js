const { Oil, validate } = require("../models/oil");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const oils = await Oil.find().select("-__v").sort("name") ;
  res.send(oils);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const oil = await Oil.findById(req.params.id).select("-__v");

  if (!oil)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oil);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const oil = new Oil({
      
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
  await oil.save();

  res.send(oil);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body); //I remove the oil after the "req.body" to try for errors because was not working and if this is a bug to fix it
  if (error) return res.status(400).send(error.details[0].message);

  const oil = await Oil.findByIdAndUpdate(
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

  if (!oil)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oil);
});


router.delete("/:id", [auth, admin], async (req, res) => {
  const oil = await Oil.findByIdAndRemove(req.params.id);

  if (!oil)
    return res.status(404).send("The oil with the given ID was not found.");

  res.send(oil);
});

module.exports = router;
