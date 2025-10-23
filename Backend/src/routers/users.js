
const {
    registerUser,
    loginUsers,
    fetchAllUsers,
    fetchUserById,
    updateUserById,
    deleteUserById
} = require('../controllers/userControllers');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/register', verifyToken, registerUser);
router.post('/login', loginUsers);
router.get('/company/:companyId', verifyToken, fetchAllUsers);
router.get('/:id', verifyToken, fetchUserById);
router.put('/update/:id', verifyToken, updateUserById);
router.delete('/delete/:id', verifyToken, deleteUserById);

module.exports = router;
