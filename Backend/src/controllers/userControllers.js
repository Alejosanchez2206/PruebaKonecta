const { 
    createUser , 
    loginUser  ,
    getAllUsers , 
    getUserById ,
    updateUser ,
    deleteUser
} = require('../services/usersService');

const registerUser = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

const loginUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await loginUser(email, password);
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(401).json({ error: 'Error al iniciar sesión' });
    }
};

const fetchAllUsers = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const users = await getAllUsers(companyId);
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener todos los usuarios' });
    }
};

const fetchUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }   
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario por ID:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const updatedUser = await updateUser(userId, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al actualizar el usuario ');
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error al eliminar el usuario');
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};





module.exports = { registerUser, loginUsers, fetchAllUsers, fetchUserById , updateUserById , deleteUserById};
