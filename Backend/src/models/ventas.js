const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Ventas = sequelize.define('ventas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },


    producto: {
        type: DataTypes.ENUM('Credito de Consumo', 'Libranza Libre Inversión', 'Tarjeta de Credito'),
        allowNull: false,
    },

    cupo_solicitado: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    franquicia: {
        type: DataTypes.ENUM('AMEX', 'VISA', 'MASTERCARD'),
        allowNull: true
    },

    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    usuario_crea: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },

    usuario_actualiza: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    tasa: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },

    company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'company',
            key: 'id'
        },
        field: 'company_id'
    }
}, {
    tableName: 'ventas',
    timestamps: false,
    hooks: {
        beforeUpdate: (venta) => {
            venta.fecha_actualizacion = new Date();
        }
    }
});

module.exports = Ventas;