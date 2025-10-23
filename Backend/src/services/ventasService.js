const VentasModel = require('../models/ventas');
const userModels = require('../models/Users');
const { Op, fn, col, literal } = require('sequelize');

VentasModel.belongsTo(userModels, {
    foreignKey: 'usuario_crea',
    as: 'asesor'
});

const createVenta = async (ventaData) => {
    try {
        await VentasModel.sync();

        if (ventaData.producto === 'Tarjeta de Credito' && !ventaData.franquicia)
            return { success: false, message: 'Debe indicar una franquicia para tarjetas de crédito' };

        if (
            (ventaData.producto === 'Credito de Consumo' || ventaData.producto === 'Libranza Libre Inversión') &&
            (ventaData.tasa === null || ventaData.tasa === undefined)
        )
            return { success: false, message: 'Debe indicar una tasa para créditos de consumo o libranzas' };

        if (!ventaData.franquicia || ventaData.franquicia.trim() === '') {
            delete ventaData.franquicia;
        }

        if (!ventaData.tasa || ventaData.tasa === 0) {
            delete ventaData.tasa;
        }

        const venta = await VentasModel.create(ventaData);
        return { success: true, message: 'Venta creada exitosamente', data: venta };

    } catch (error) {
        console.error('Error al crear la venta:', error);
        throw error;
    }
};


const updateVenta = async (id, ventaData) => {
    try {
        await VentasModel.sync();
        const venta = await VentasModel.findByPk(id);
        if (!venta) return { success: false, message: 'Venta no encontrada' };

        if (ventaData.producto === 'Tarjeta de Credito' && !ventaData.franquicia)
            return { success: false, message: 'Debe indicar una franquicia para tarjetas de crédito' };

        if (
            (ventaData.producto === 'Credito de Consumo' || ventaData.producto === 'Libranza Libre Inversión') &&
            (ventaData.tasa === null || ventaData.tasa === undefined)
        )
            return { success: false, message: 'Debe indicar una tasa para créditos de consumo o libranzas' };

        ventaData.usuario_actualiza = ventaData.usuario_actualiza;
        ventaData.fecha_actualizacion = new Date();

        await venta.update(ventaData);
        return { success: true, message: 'Venta actualizada correctamente', data: venta };
    } catch (error) {
        console.error('Error al actualizar la venta:', error);
        throw error;
    }
};

const listVentas = async (rol_id, userId, company_id) => {
    try {
        await VentasModel.sync();

        if (!company_id) {
            throw new Error("El company_id no fue proporcionado al listar ventas");
        }

        // Convertir rol_id a número para comparación segura
        const rolIdNum = parseInt(rol_id, 10);

        const whereCondition = rolIdNum === 1
            ? { company_id }
            : { usuario_crea: userId, company_id };

        const ventas = await VentasModel.findAll({
            where: whereCondition,
            order: [['fecha_creacion', 'DESC']],
        });

        return { success: true, data: ventas };
    } catch (error) {
        console.error("Error al listar las ventas:", error);
        throw error;
    }
};


const deleteVenta = async (id) => {
    try {
        const venta = await VentasModel.findByPk(id);
        if (!venta) {
            return { success: false, message: 'Venta no encontrada' };
        }
        await venta.destroy();
        return { success: true, message: 'Venta eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        throw error;
    }
};

const getInformeVentas = async (company_id) => {
    try {
        if (!company_id) {
            throw new Error("El company_id es requerido");
        }

        const whereCondition = { company_id };

        const DateNow = new Date();
        const primerDiaMes = new Date(DateNow.getFullYear(), DateNow.getMonth(), 1);
        const ultimoDiaMes = new Date(DateNow.getFullYear(), DateNow.getMonth() + 1, 0, 23, 59, 59);

        whereCondition.fecha_creacion = {
            [Op.between]: [primerDiaMes, ultimoDiaMes]
        };

        // 1. Cantidad de ventas por asesor
        const ventasPorAsesor = await VentasModel.findAll({
            attributes: [
                'usuario_crea',
                [fn('COUNT', col('ventas.id')), 'total_ventas'], // Especificar tabla
                [fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'total_cupos']
            ],
            include: [{
                model: userModels,
                as: 'asesor',
                attributes: ['id', 'name', 'email']
            }],
            where: whereCondition,
            group: ['usuario_crea', 'asesor.id', 'asesor.name', 'asesor.email'], // Incluir todos los campos no agregados
            order: [[fn('COUNT', col('ventas.id')), 'DESC']]
        });

        // 2. Sumatoria de cupos por producto
        const cuposPorProducto = await VentasModel.findAll({
            attributes: [
                'producto',
                [fn('COUNT', col('id')), 'cantidad_ventas'],
                [fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'total_cupos'],
                [fn('AVG', literal('CAST(cupo_solicitado AS DECIMAL)')), 'promedio_cupo']
            ],
            where: whereCondition,
            group: ['producto'],
            order: [[fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'DESC']]
        });

        // 3. Cantidad de ventas por fecha (agrupado por día)
        const ventasPorFecha = await VentasModel.findAll({
            attributes: [
                [fn('DATE', col('fecha_creacion')), 'fecha'],
                [fn('COUNT', col('id')), 'total_ventas'],
                [fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'total_cupos']
            ],
            where: whereCondition,
            group: [fn('DATE', col('fecha_creacion'))],
            order: [[fn('DATE', col('fecha_creacion')), 'DESC']]
        });

        // 4. Resumen general
        const resumenGeneral = await VentasModel.findOne({
            attributes: [
                [fn('COUNT', col('id')), 'total_ventas'],
                [fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'total_cupos'],
                [fn('AVG', literal('CAST(cupo_solicitado AS DECIMAL)')), 'promedio_cupo'],
                [fn('MAX', literal('CAST(cupo_solicitado AS DECIMAL)')), 'cupo_maximo'],
                [fn('MIN', literal('CAST(cupo_solicitado AS DECIMAL)')), 'cupo_minimo']
            ],
            where: whereCondition
        });

        // 5. Ventas por franquicia (solo para Tarjeta de Crédito)
        const ventasPorFranquicia = await VentasModel.findAll({
            attributes: [
                'franquicia',
                [fn('COUNT', col('id')), 'total_ventas'],
                [fn('SUM', literal('CAST(cupo_solicitado AS DECIMAL)')), 'total_cupos']
            ],
            where: {
                ...whereCondition,
                producto: 'Tarjeta de Credito',
                franquicia: { [Op.not]: null }
            },
            group: ['franquicia'],
            order: [[fn('COUNT', col('id')), 'DESC']]
        });

        // Obtener información del período
        const now = new Date();
        const nombreMes = now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        return {
            success: true,
            periodo: nombreMes,
            data: {
                ventasPorAsesor: ventasPorAsesor.map(v => ({
                    asesor_id: v.usuario_crea,
                    asesor_nombre: v.asesor?.name || 'N/A',
                    asesor_email: v.asesor?.email || 'N/A',
                    total_ventas: parseInt(v.dataValues.total_ventas),
                    total_cupos: parseFloat(v.dataValues.total_cupos || 0).toFixed(2)
                })),
                cuposPorProducto: cuposPorProducto.map(v => ({
                    producto: v.producto,
                    cantidad_ventas: parseInt(v.dataValues.cantidad_ventas),
                    total_cupos: parseFloat(v.dataValues.total_cupos || 0).toFixed(2),
                    promedio_cupo: parseFloat(v.dataValues.promedio_cupo || 0).toFixed(2)
                })),
                ventasPorFecha: ventasPorFecha.map(v => ({
                    fecha: v.dataValues.fecha,
                    total_ventas: parseInt(v.dataValues.total_ventas),
                    total_cupos: parseFloat(v.dataValues.total_cupos || 0).toFixed(2)
                })),
                ventasPorFranquicia: ventasPorFranquicia.map(v => ({
                    franquicia: v.franquicia,
                    total_ventas: parseInt(v.dataValues.total_ventas),
                    total_cupos: parseFloat(v.dataValues.total_cupos || 0).toFixed(2)
                })),
                resumenGeneral: {
                    total_ventas: parseInt(resumenGeneral.dataValues.total_ventas),
                    total_cupos: parseFloat(resumenGeneral.dataValues.total_cupos || 0).toFixed(2),
                    promedio_cupo: parseFloat(resumenGeneral.dataValues.promedio_cupo || 0).toFixed(2),
                    cupo_maximo: parseFloat(resumenGeneral.dataValues.cupo_maximo || 0).toFixed(2),
                    cupo_minimo: parseFloat(resumenGeneral.dataValues.cupo_minimo || 0).toFixed(2)
                }
            }
        };
    } catch (error) {
        console.error('Error al generar informe de ventas:', error);
        throw error;
    }
};

module.exports = {
    createVenta,
    updateVenta,
    listVentas,
    deleteVenta,
    getInformeVentas
};
