// controllers/DataController.js
const { DataTable } = require('../models');

// Create a new data item
const createData = async (req, res) => {
  try {
    // Destructure the data from the request body
    const {
      kode_satker,
      tahun,
      no_urut,
      satker,
      nama_dataset,
      objek_data,
      variabel_pembentuk,
      format_dokumen_data,
      jenis_data,
      status,
      produsen_data,
      jadwal_pemutakhiran,
      tagging_data_prioritas,
      prioritas_nasional,
      program_prioritas,
      kesepakatan_berbagi_data,
      link_api,
      kesepakatan_pengumpulan_data,
      catatan,
      dasar_hukum,
      kategori
    } = req.body;
    const no_katalog_data = `${kode_satker}.${tahun}.${no_urut}`;

    // Create a new Data instance
    const newData = await DataTable.create({
      no_katalog_data : no_katalog_data,
      kode_satker,
      tahun,
      no_urut,
      satker,
      nama_dataset,
      objek_data,
      variabel_pembentuk,
      format_dokumen_data,
      jenis_data,
      status,
      produsen_data,
      jadwal_pemutakhiran,
      tagging_data_prioritas,
      prioritas_nasional,
      program_prioritas,
      kesepakatan_berbagi_data,
      link_api,
      kesepakatan_pengumpulan_data,
      catatan,
      dasar_hukum,
      kategori
    });

    // Save the new Data to the database

    res.status(201).json(newData);
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

// Update an existing Data item by ID
const updateData = async (req, res) => {
  const dataId = req.params.id; // Assuming you pass the Data ID as a parameter

  try {
    // Find the Data by its ID
    const existingData = await DataTable.findByPk(dataId);

    if (!existingData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Destructure the data from the request body
    const {
      no_katalog_data,
      kode_satker,
      tahun,
      no_urut,
      satker,
      nama_dataset,
      objek_data,
      variabel_pembentuk,
      format_dokumen_data,
      jenis_data,
      status,
      produsen_data,
      jadwal_pemutakhiran,
      tagging_data_prioritas,
      prioritas_nasional,
      program_prioritas,
      kesepakatan_berbagi_data,
      link_api,
      kesepakatan_pengumpulan_data,
      catatan,
      dasar_hukum,
    } = req.body;

    // Update the Data instance
    existingData.no_katalog_data = no_katalog_data;
    existingData.kode_satker = kode_satker;
    existingData.tahun = tahun;
    existingData.no_urut = no_urut;
    existingData.satker = satker;
    existingData.nama_dataset = nama_dataset;
    existingData.objek_data = objek_data;
    existingData.variabel_pembentuk = variabel_pembentuk;
    existingData.format_dokumen_data = format_dokumen_data;
    existingData.jenis_data = jenis_data;
    existingData.status = status;
    existingData.produsen_data = produsen_data;
    existingData.jadwal_pemutakhiran = jadwal_pemutakhiran;
    existingData.tagging_data_prioritas = tagging_data_prioritas;
    existingData.prioritas_nasional = prioritas_nasional;
    existingData.program_prioritas = program_prioritas;
    existingData.kesepakatan_berbagi_data = kesepakatan_berbagi_data;
    existingData.link_api = link_api;
    existingData.kesepakatan_pengumpulan_data = kesepakatan_pengumpulan_data;
    existingData.catatan = catatan;
    existingData.dasar_hukum = dasar_hukum;

    // Save the updated Data
    await existingData.save();

    res.json(existingData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a Data item by ID
const deleteData = async (req, res) => {
  const dataId = req.params.id; // Assuming you pass the Data ID as a parameter

  try {
    // Find the Data by its ID
    const existingData = await DataTable.findByPk(dataId);

    if (!existingData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Delete the Data
    await existingData.destroy();

    res.json({ message: 'Data deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Repeat a similar structure for Data and Aplikasi controllers
module.exports = { createData, getAllData, updateData, deleteData }