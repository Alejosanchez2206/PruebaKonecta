const { createNewRol, fetchAllRoles } = require('../controllers/roleController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/', createNewRol);
router.get('/', verifyToken, fetchAllRoles);
module.exports = router;