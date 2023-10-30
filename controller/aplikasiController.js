// controllers/aplikasiController.js
const { Aplikasi } = require('../models');

// Create a new aplikasi item
const createAplikasi = async (req, res) => {
  try {
    const aplikasi = await Aplikasi.create(req.body);
    res.status(201).json(aplikasi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all aplikasi items
const getAllAplikasi = async (req, res) => {
  try {
    const aplikasi = await Aplikasi.findAll();
    res.json(aplikasi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Repeat a similar structure for aplikasi and Aplikasi controllers
module.exports = { createAplikasi, getAllAplikasi }