const {
    createVenta,
    updateVenta,
    listVentas,
    deleteVenta,
    getInformeVentas
} = require('../services/ventasService');

const createNewVenta = async (req, res) => {
    try {
        const ventasData = req.body;
        const newVenta = await createVenta(ventasData);
        res.status(201).json(newVenta);
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

const updateVentaById = async (req, res) => {
    try {
        const ventaId = req.params.id;
        const ventaData = req.body;
        const updatedVenta = await updateVenta(ventaId, ventaData)
        res.status(200).json(updatedVenta);
    } catch (error) {
        console.log('Error al actualizar la venta:', error);
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

const fetchAllVentas = async (req, res) => {
    try {
        const { rol_id, userId, company_id } = req.params;

        const ventas = await listVentas(rol_id, userId, company_id);
        res.status(200).json(ventas);
    } catch (error) {
        console.error('Error al listar las ventas:', error);
        res.status(500).json({ error: 'Error al listar las ventas' });
    }
};



const deleteVentaById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVenta = await deleteVenta(id);
        res.status(200).json(deletedVenta);
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};

const getNewInformeVentas = async (req, res) => {
    try {
        const { company_id } = req.params;
        const informeVentas = await getInformeVentas(company_id);
        res.status(200).json(informeVentas);
    } catch (error) {
        console.error('Error al generar el informe de ventas:', error);
        res.status(500).json({ error: 'Error al generar el informe de ventas' });
    }

};

module.exports = {
    createNewVenta,
    updateVentaById,
    fetchAllVentas,
    deleteVentaById,
    getNewInformeVentas
};

