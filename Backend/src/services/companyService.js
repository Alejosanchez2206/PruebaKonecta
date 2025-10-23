const companyModel = require('../models/company');

const createCompany = async (companyData) => {
    try {
        // Asegurarse de que la tabla existe
        await companyModel.sync();
        const newCompany = await companyModel.create(companyData);
        return newCompany;
    } catch (error) {
        console.error('Error al crear la compañía:', error);
        throw error;
    }
};

const getCompanyById = async (id) => {
    try {
        const company = await companyModel.findByPk(id);
        return company;
    } catch (error) {
        console.error('Error al obtener la compañía por ID:', error);
        throw error;
    }
};

const updateCompany = async (id, companyData) => {
    try {
        const company = await companyModel.findByPk(id);
        if (!company) {
            return {
                success: false,
                message: 'Compañía no encontrada'
            };
        }
        await company.update(companyData);
        return {
            success: true,
            message: 'Compañía actualizada exitosamente'
        };
    } catch (error) {
        console.error('Error al actualizar la compañía:', error);
        throw error;
    }
};


module.exports = { createCompany, getCompanyById , updateCompany };
