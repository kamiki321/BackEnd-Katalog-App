const router = require('express').Router()
const { findAllUsers, getUsersById, createNewUser, updateUser, deleteUser, loginUser, logoutUser, createNewAdmin, loginAdmin, changePassword } = require('../controller/userController')
const { verifyToken, AdminRole, UserRole } = require('../middleware/authMiddleware')
const { getAllData, createData, deleteData, updateData } = require('../controller/dataController');
const { getAllHardware, createHardware, deleteHardware, updateHardware } = require('../controller/hardwareController');
const { getAllAplikasi, createAplikasi, deleteAplikasi, updateAplikasi, handleFileUpload } = require('../controller/aplikasiController');
const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
//non-protected
    //admin
    router.post('/admin/login', loginAdmin);
    router.post('/admin/register', createNewAdmin);
    //user
    router.post('/login', loginUser);
    router.post('/register', createNewUser);
    //aplikasi
    router.post('/aplikasi/upload', handleFileUpload);
    
    
//protected
    //user
    router.use(verifyToken);
    router.get('/users', findAllUsers);
    router.get('/users/:id', getUsersById);
    router.delete('/users/:id' , deleteUser);
    router.patch('/users/:id', updateUser);
    router.post('/logout', logoutUser);
    router.patch('/changePassword/:id', changePassword )
    //hardware
    router.get('/katalog/hardware', getAllHardware)
    router.post('/input/hardware', createHardware);
    router.delete('/katalog/hardware/:id', deleteHardware)
    router.patch('/katalog/hardware/:id',updateHardware)
    //data
    router.post('/input/data', createData);
    router.get('/katalog/data', getAllData)
    router.delete('/katalog/data/:id', deleteData)
    router.patch('/katalog/data/:id', updateData)
    //aplikasi
    router.post('/input/aplikasi', createAplikasi);
    router.delete('/katalog/aplikasi/:id', deleteAplikasi)
    router.patch('/katalog/aplikasi/:id', updateAplikasi)
    router.get('/katalog/aplikasi', getAllAplikasi)




module.exports = router




