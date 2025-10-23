const { sequelize } = require('../config/database');

const Users = require('./Users');
const Company = require('./company');
const Roles = require('./rol');

// Define associations
Company.hasMany(Users, { foreignKey: 'company_id', as: 'users' });
Roles.hasMany(Users, { foreignKey: 'rol_id', as: 'users' });
Users.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
Users.belongsTo(Roles, { foreignKey: 'rol_id', as: 'roles' });

module.exports = {
  sequelize,
  Users,
  Company,
  Roles,
};
