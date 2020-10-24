const { Herb, validate } = require("../models/herb");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const moment = require("moment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const herbs = await Herb.find().select("-__v").sort("name") ;
  res.send(herbs);
});

router.post("/", [auth], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const herb = new Herb({
      
    name: req.body.name,
      synonims: req.body.synonims,
      tags:req.body.tags,
      location: req.body.location,
      usedParts:req.body.usedParts,
      chemicalIngredients: req.body.chemicalIngredients,
      usage: req.body.usage
  });
  await herb.save();

  res.send(herb);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const herb = await Herb.findByIdAndRemove(req.params.id);

  if (!herb)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(herb);
});

module.exports = router;
