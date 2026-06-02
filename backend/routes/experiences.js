const express = require("express");
const router = express.Router();
const Experience = require("../models/Experience");

// CREATE
router.post("/", async (req, res) => {
  try {
    const exp = new Experience(req.body);
    await exp.save();
    res.status(201).json(exp);
  } catch (error) {
    res.status(400).json({ message: "No se pudo crear la experiencia", error: error.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const exps = await Experience.find().sort({ startDate: -1, createdAt: -1 });
    res.json(exps);
  } catch (error) {
    res.status(500).json({ message: "No se pudieron cargar las experiencias", error: error.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: "Experiencia no encontrada" });
    res.json(exp);
  } catch (error) {
    res.status(400).json({ message: "Id invalido", error: error.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Experiencia no encontrada" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "No se pudo actualizar la experiencia", error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Experiencia no encontrada" });
    res.json({ message: "Experiencia eliminada" });
  } catch (error) {
    res.status(400).json({ message: "No se pudo eliminar la experiencia", error: error.message });
  }
});

module.exports = router;
