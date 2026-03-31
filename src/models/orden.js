const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cliente = require('./cliente');

const Orden = sequelize.define('Orden', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tipo: { type: DataTypes.ENUM('delivery', 'local'), allowNull: false },
  estado: { type: DataTypes.STRING, defaultValue: 'pendiente' },
  direccion_entrega: { type: DataTypes.STRING },
});

Orden.belongsTo(Cliente, { foreignKey: 'clienteId' });

module.exports = Orden;