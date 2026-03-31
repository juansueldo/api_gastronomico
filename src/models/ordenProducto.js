const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Orden = require('./orden');
const Producto = require('./producto');

const OrdenProducto = sequelize.define('OrdenProducto', {
  cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

Orden.belongsToMany(Producto, { through: OrdenProducto, foreignKey: 'ordenId' });
Producto.belongsToMany(Orden, { through: OrdenProducto, foreignKey: 'productoId' });

module.exports = OrdenProducto;