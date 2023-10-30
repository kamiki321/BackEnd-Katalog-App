const router = require('express').Router()
const { findAllUsers, getUsersById, createNewUser, updateUser, deleteUser, loginUser, logoutUser, createNewAdmin, loginAdmin } = require('../controller/userController')
const { verifyToken, AdminRole, UserRole } = require('../middleware/authMiddleware')
const { getAllData } = require('../controller/dataController');
const { getAllHardware } = require('../controller/hardwareController');
const { getAllAplikasi } = require('../controller/aplikasiController');


//admin
router.post('/admin/login', loginAdmin);
router.post('/admin/register', createNewAdmin);

//user
router.post('/login', loginUser);
router.post('/register', createNewUser);


//protected
router.use(verifyToken);
router.get('/users', findAllUsers);
router.get('/users/:id', getUsersById);
router.delete('/users/:id' , deleteUser);
router.patch('/users/:id', updateUser);
router.post('/logout', logoutUser);
//hardware
router.get('/katalog/hardware', getAllHardware)

//data
router.get('/katalog/data', getAllData)

//aplikasi
router.get('/katalog/aplikasi', getAllAplikasi)

module.exports = router




