// controllers/DataController.js
const { DataTable } = require('../models');

// Create a new data item
const createData = async (req, res) => {
  try {
    const data = await DataTable.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all data items
const getAllData = async (req, res) => {
  try {
    const data = await DataTable.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Repeat a similar structure for Data and Aplikasi controllers
module.exports = { createData, getAllData }