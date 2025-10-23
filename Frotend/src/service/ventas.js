import config from '../../config.json';

const API_BASE_URL = config.BACKEND_URL;
const TOKEN = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
const rol_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).rol_id : null;
const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
const company_id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).company_id : null;


export const ventaService = {
    createVentas: async (venta) => {
        const response = await fetch(`${API_BASE_URL}/ventas`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venta),
        });
        return response.json();
    },

    updateVentas: async (id, venta) => {
        const response = await fetch(`${API_BASE_URL}/ventas/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venta),
        });
        return response.json();
    },

    getsVentas: async () => {
        const response = await fetch(`${API_BASE_URL}/ventas/${rol_id}/${userId}/${company_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    deleteVentas: async (id) => {
        const response = await fetch(`${API_BASE_URL}/ventas/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    informeDassboard: async () => {
        const response = await fetch(`${API_BASE_URL}/ventas/informe/${company_id}`, {
                method: 'GET',
                 headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }


}