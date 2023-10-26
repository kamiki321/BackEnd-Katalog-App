const router = require('express').Router()
const { findAllUsers, getUsersById, createNewUser, updateUser, deleteUser, loginUser, logoutUser, createNewAdmin, loginAdmin } = require('../controller/userController')
const verifyToken = require('../middleware/authMiddleware')

router.post('/admin/login', loginAdmin);
router.post('/admin/register', createNewAdmin);
router.post('/login', loginUser);
router.post('/register', createNewUser);
router.delete('/users/:id', deleteUser);

//protected
router.get('/users', verifyToken, findAllUsers);
router.get('/users/:id', verifyToken, getUsersById);
router.patch('/users/:id', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);

//non-protected
// router.get('/users', findAllUsers)
// router.get('/users/:id', getUsersById)
// router.post('/users', createNewUser)
// router.patch('/users/:id', updateUser)
// router.delete('/users/:id', deleteUser)
// router.post('/login', loginUser);

module.exports = router
