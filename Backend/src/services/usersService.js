const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkEmail = require('../utils/checkEmail');
const { ABSTRACT } = require('sequelize');
const saltRounds = 10;

const createUser = async (userData) => {
    try {
        // Asegurarse de que la tabla existe
        await Users.sync();
        if (!checkEmail(userData.email)) {
            return {
                success: false,
                message: 'Formato de correo electrónico inválido'
            };
        }

        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        const newUser = await Users.create({ ...userData, password: hashedPassword });

        // Excluir la contraseña de la respuesta
        const userWithoutPassword = newUser.get();
        delete userWithoutPassword.password;
        return {
            success: true,
            message: 'Usuario creado exitosamente'

        };

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

const loginUser = async (email, password) => {
    try {

        if (!checkEmail(email)) {
            return {
                success: false,
                message: 'Formato de correo electrónico inválido'
            };
        }

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return {
                success: false,
                message: 'Datos de inicio de sesión incorrectos'
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Datos de inicio de sesión incorrectos'
            };
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '6h' });
        const dataObject = {
            name: user.name,
            email: user.email,
            rol_id: user.rol_id,
            company_id: user.company_id,
            token: token
        }
        return {
            success: true,
            user: dataObject
        };

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

const getAllUsers = async (id) => {
    try {
        const users = await Users.findAll({
            where: { company_id: id },
            attributes: { exclude: ['password'] }
        });

        if (!users || users.length === 0) {
            return {
                success: false,
                message: 'No se encontraron usuarios'
            };
        }

        return users;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const user = await Users.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return {
                success: false,
                message: 'Usuario no encontrado'
            };
        }

        return user;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error;
    }
};


const updateUser = async (id, userData) => {
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return {
                success: false,
                message: 'Usuario no encontrado'
            };
        }

        if (!userData.password || userData.password.trim() === '') {
            delete userData.password;
        }

        console.log('Actualizando usuario con datos:', userData);
        await user.update(userData);

        return {
            success: true,
            message: 'Usuario actualizado exitosamente'
        };
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
};


const deleteUser = async (id) => {
    try {
        const user = await Users.findByPk(id);
        if (!user) {
            return {
                success: false,
                message: 'Usuario no encontrado'
            };
        }
        await user.destroy();
        return {
            success: true,
            message: 'Usuario eliminado exitosamente'
        };
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
}




module.exports = { createUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser };