require('dotenv').config();
const { Sequelize } = require('sequelize');

/*const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});
*/

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  dialectModule: require('pg'),
  logging: false
});

// 🔥 FORZAR IPv4
require('dns').setDefaultResultOrder('ipv4first');

module.exports = sequelize;