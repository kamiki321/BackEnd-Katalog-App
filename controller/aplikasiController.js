// controllers/aplikasiController.js
const { Aplikasi } = require('../models');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('image');

// Create a new aplikasi item
const createAplikasi = async (req, res) => {
  try {
    // Destructure the data from the request body
    const {
      title,
      content,
      jenis_aplikasi,
      pemilik_aplikasi,
      pengguna_aplikasi,
      buttonUrl,
    } = req.body;
    const uploadedFile = req.file; 

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imagePath = uploadedFile.path
    // Create a new Aplikasi instance
    const newAplikasi = await  Aplikasi.create({
      imageUrl: imagePath,
      title,
      content,
      jenis_aplikasi,
      pemilik_aplikasi,
      pengguna_aplikasi,
      buttonUrl,
    });

    res.status(201).json(newAplikasi);
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

// Update an existing Aplikasi item by ID
const updateAplikasi = async (req, res) => {
  const aplikasiId = req.params.id; // Assuming you pass the Aplikasi ID as a parameter

  try {
    // Find the Aplikasi by its ID
    const existingAplikasi = await Aplikasi.findByPk(aplikasiId);

    if (!existingAplikasi) {
      return res.status(404).json({ message: 'Aplikasi not found' });
    }

    // Destructure the data from the request body
    const {
      imageUrl,
      title,
      content,
      jenis_aplikasi,
      pemilik_aplikasi,
      pengguna_aplikasi,
      buttonUrl,
    } = req.body;

    // Update the Aplikasi instance
    existingAplikasi.imageUrl = imageUrl;
    existingAplikasi.title = title;
    existingAplikasi.content = content;
    existingAplikasi.jenis_aplikasi = jenis_aplikasi;
    existingAplikasi.pemilik_aplikasi = pemilik_aplikasi;
    existingAplikasi.pengguna_aplikasi = pengguna_aplikasi;
    existingAplikasi.buttonUrl = buttonUrl;

    // Save the updated Aplikasi
    await existingAplikasi.save();

    res.json(existingAplikasi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an Aplikasi item by ID
const deleteAplikasi = async (req, res) => {
  const aplikasiId = req.params.id; // Assuming you pass the Aplikasi ID as a parameter

  try {
    // Find the Aplikasi by its ID
    const existingAplikasi = await Aplikasi.findByPk(aplikasiId);

    if (!existingAplikasi) {
      return res.status(404).json({ message: 'Aplikasi not found' });
    }

    // Delete the Aplikasi
    await existingAplikasi.destroy();

    res.json({ message: 'Aplikasi deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const handleFileUpload = async (req, res) => {
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(req.file);
        }
      });
    });

    if (!uploadResult) {
      return res.status(500).json({ error: 'File upload failed.' });
    }

    const { title, content, jenis_aplikasi, pemilik_aplikasi, pengguna_aplikasi, buttonUrl } = req.body;
    const imageUrl = uploadResult.path;

    const newAplikasi = await Aplikasi.create({
      imageUrl,
      title,
      content,
      jenis_aplikasi,
      pemilik_aplikasi,
      pengguna_aplikasi,
      buttonUrl,
    });

    res.status(201).json({filePath: imageUrl, newAplikasi});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Repeat a similar structure for aplikasi and Aplikasi controllers
module.exports = { createAplikasi, getAllAplikasi, updateAplikasi, deleteAplikasi, handleFileUpload }