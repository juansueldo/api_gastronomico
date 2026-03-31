const sequelize = require('./db');
const Cliente = require('./cliente');
const Producto = require('./producto');
const Orden = require('./orden');
const Mesa = require('./mesa');
const Reserva = require('./reserva');
const OrdenProducto = require('./ordenProducto');

// Sincroniza todos los modelos
async function syncModels() {
  await sequelize.sync({ alter: true });
  console.log('Modelos sincronizados');
}

module.exports = {
  Cliente,
  Producto,
  Orden,
  Mesa,
  Reserva,
  OrdenProducto,
  syncModels,
};