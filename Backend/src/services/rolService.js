const rolesModels = require('../models/rol');


const createRol = async (rolData) => {
    try {
        // Asegurarse de que la tabla existe
        await rolesModels.sync();
        const newRol = await rolesModels.create(rolData);
        return newRol;
    } catch (error) {
        console.error('Error al crear el rol:', error);
        throw error;
    }
};

const getAllRoles = async () => {
    try {
        const roles = await rolesModels.findAll();
        return roles;
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        throw error;
    }
};

module.exports = { createRol, getAllRoles };