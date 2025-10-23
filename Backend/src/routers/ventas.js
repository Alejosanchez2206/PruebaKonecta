const {
    createNewVenta,
    updateVentaById,
    fetchAllVentas,
    deleteVentaById,
    getNewInformeVentas

} = require('../controllers/ventasController');
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');


router.post('/', verifyToken, createNewVenta);
router.put('/:id', verifyToken, updateVentaById);
router.get('/:rol_id/:userId/:company_id', verifyToken, fetchAllVentas);
router.delete('/:id', verifyToken, deleteVentaById);
router.get('/informe/:company_id', verifyToken, getNewInformeVentas);

module.exports = router;