const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

// CREATE
router.post("/", async (req, res) => {
  const exp = new Experience(req.body);
  await exp.save();
  res.json(exp);
});

// READ ALL
router.get("/", async (req, res) => {
  const exps = await Experience.find();
  res.json(exps);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const exp = await Experience.findById(req.params.id);
  res.json(exp);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Experience.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;