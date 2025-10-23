import config from '../../config.json';

const API_BASE_URL = config.BACKEND_URL;
const TOKEN = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

export const userService = {
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        return response.json();
    },

    // Obtener todos los usuarios
    getAllUsers: async (id) => {
        const response = await fetch(`${API_BASE_URL}/users/company/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    },

    createUser: async (user) => {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return response.json();
    },

    deleteUser: async (id) => {
        const response = await fetch(`${API_BASE_URL}/users/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    },

    updateUser: async (id, user) => {
        const response = await fetch(`${API_BASE_URL}/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify(user)
        });
        return response.json();
    }

};
