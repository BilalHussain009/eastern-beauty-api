const { HerbBG, validate } = require("../models/herbBG");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const herbs = await HerbBG.find().select("-__v").sort("name") ;
  res.send(herbs);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const herb = await HerbBG.findById(req.params.id).select("-__v");

  if (!herb)
    return res.status(404).send("The herb with the given ID was not found.");

  res.send(herb);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const herbBG = new HerbBG({
    name: req.body.name,
      synonims: req.body.synonims,
      tags:req.body.tags,
      location: req.body.location,
      usedParts:req.body.usedParts,
      chemicalIngredients: req.body.chemicalIngredients,
      usage: req.body.usage
  });
  await herbBG.save();

  res.send(herbBG);
});

router.put("/:id", [auth], async (req, res) => {
  const { error } = validate(req.body.herb);
  if (error) return res.status(400).send(error.details[0].message);

  const herb = await HerbBG.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      synonims: req.body.synonims,
      tags: req.body.tags,
      location: req.body.location,
      usedParts: req.body.usedParts,
      chemicalIngredients: req.body.chemicalIngredients,
      usage: req.body.usage
    },
    { new: true }
  );

  if (!herb)
    return res.status(404).send("The herb with the given ID was not found.");

  res.send(herb);
});


router.delete("/:id", [auth, admin], async (req, res) => {
  const herb = await HerbBG.findByIdAndRemove(req.params.id);

  if (!herb)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(herb);
});

module.exports = router;
