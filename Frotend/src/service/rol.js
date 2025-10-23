import config from '../../config.json';

const API_BASE_URL = config.BACKEND_URL;
const TOKEN = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const rolService = {
    // Obtener todos los roles
    getAllRoles: async () => {
        const response = await fetch(`${API_BASE_URL}/rol`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },
};

