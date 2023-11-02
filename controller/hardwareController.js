// controllers/hardwareController.js
const { Hardware } = require('../models');

// Create a new hardware item
const createHardware = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { no_serial, jenis, type } = req.body;

    // Create a new Hardware instance
    const newHardware = await Hardware.create({
      no_serial,
      jenis,
      type,
    });

    res.status(201).json(newHardware);
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

// Update an existing Hardware item by ID
const updateHardware = async (req, res) => {
  const hardwareId = req.params.id; // Assuming you pass the Hardware ID as a parameter

  try {
    // Find the Hardware by its ID
    const existingHardware = await Hardware.findByPk(hardwareId);

    if (!existingHardware) {
      return res.status(404).json({ message: 'Hardware not found' });
    }

    // Destructure the data from the request body
    const { no_serial, jenis, type } = req.body;

    // Update the Hardware instance
    existingHardware.no_serial = no_serial;
    existingHardware.jenis = jenis;
    existingHardware.type = type;

    // Save the updated Hardware
    await existingHardware.save();

    res.json(existingHardware);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Hardware item by ID
const deleteHardware = async (req, res) => {
  const hardwareId = req.params.id; // Assuming you pass the Hardware ID as a parameter

  try {
    // Find the Hardware by its ID
    const existingHardware = await Hardware.findByPk(hardwareId);

    if (!existingHardware) {
      return res.status(404).json({ message: 'Hardware not found' });
    }

    // Delete the Hardware
    await existingHardware.destroy();

    res.json({ message: 'Hardware deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Repeat a similar structure for Data and Aplikasi controllers
module.exports = { createHardware, getAllHardware, updateHardware, deleteHardware }