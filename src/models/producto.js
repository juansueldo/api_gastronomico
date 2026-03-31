const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Producto = sequelize.define('Producto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
});

module.exports = Producto;