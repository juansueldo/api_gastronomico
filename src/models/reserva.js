const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Cliente = require('./cliente');
const Mesa = require('./mesa');

const Reserva = sequelize.define('Reserva', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fecha: { type: DataTypes.DATE, allowNull: false },
  cantidad_personas: { type: DataTypes.INTEGER, allowNull: false },
});

Reserva.belongsTo(Cliente, { foreignKey: 'clienteId' });
Reserva.belongsTo(Mesa, { foreignKey: 'mesaId' });

module.exports = Reserva;