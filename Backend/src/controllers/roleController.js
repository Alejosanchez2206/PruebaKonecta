const { createRol , getAllRoles } = require('../services/rolService');

const createNewRol = async (req, res) => {
    try {
        const rolData = req.body;
        const newRol = await createRol(rolData);
        res.status(201).json(newRol);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el rol' });
    }
};
const fetchAllRoles = async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los roles' });
    }
};

module.exports = { createNewRol , fetchAllRoles };