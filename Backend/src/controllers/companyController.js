const { createCompany, getCompanyById } = require('../services/companyService');

const createNewCompany = async (req, res) => {
    try {
        const companyData = req.body;
        const newCompany = await createCompany(companyData);
        res.status(201).json(newCompany);
    } catch (error) {
        console.error('Error al crear la compañía:', error);
        res.status(500).json({ error: 'Error al crear la compañía' });
    }
};

const fetchCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await getCompanyById(companyId);
        if (!company) {
            return res.status(404).json({ error: 'Compañía no encontrada' });
        }
        res.status(200).json(company);
    } catch (error) {
        console.error('Error al obtener la compañía por ID:', error);
        res.status(500).json({ error: 'Error al obtener la compañía' });
    }
};

module.exports = { createNewCompany, fetchCompanyById };