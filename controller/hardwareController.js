// controllers/hardwareController.js
const { Hardware } = require('../models');

// Create a new hardware item
const createHardware = async (req, res) => {
  try {
    const hardware = await Hardware.create(req.body);
    res.status(201).json(hardware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all hardware items
const getAllHardware = async (req, res) => {
  try {
    const hardware = await Hardware.findAll();
    res.json(hardware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Repeat a similar structure for Data and Aplikasi controllers
module.exports = { createHardware, getAllHardware }