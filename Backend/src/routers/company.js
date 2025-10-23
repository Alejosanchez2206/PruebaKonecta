const { createNewCompany , fetchCompanyById } = require('../controllers/companyController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

router.post('/', createNewCompany);
router.get('/:id', verifyToken, fetchCompanyById);
module.exports = router;

