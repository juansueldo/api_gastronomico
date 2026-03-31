const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Mesa = sequelize.define('Mesa', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  numero: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  capacidad: { type: DataTypes.INTEGER, allowNull: false },
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Mesa;