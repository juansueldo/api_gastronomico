const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING },
  direccion: { type: DataTypes.STRING },
});

module.exports = Cliente;