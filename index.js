require('dotenv').config();
const express = require('express');
const app = express();

const auth = require('./src/middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');

// Middleware
app.use(express.json());

// 👇 Swagger en raíz
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ⚠️ Si querés proteger rutas, poné auth DESPUÉS
app.use(auth);

// Rutas
app.use('/clientes', require('./src/routes/clientes'));
app.use('/productos', require('./src/routes/productos'));
app.use('/mesas', require('./src/routes/mesas'));
app.use('/reservas', require('./src/routes/reservas'));
app.use('/ordenes', require('./src/routes/ordenes'));

module.exports = app;
/*require('dotenv').config();
const express = require('express');
const app = express();

const { syncModels } = require('./src/models');
const auth = require('./src/middleware/auth');

// Middleware
app.use(express.json());
app.use(auth);

// Rutas
app.use('/clientes', require('./src/routes/clientes'));
app.use('/productos', require('./src/routes/productos'));
app.use('/mesas', require('./src/routes/mesas'));
app.use('/reservas', require('./src/routes/reservas'));
app.use('/ordenes', require('./src/routes/ordenes'));

// Ruta raíz
app.get('/', (req, res) => {
	res.send('API Gastronómico funcionando');
});

// ⚠️ NO usar app.listen()
// ⚠️ NO ejecutar syncModels automáticamente acá

module.exports = app; // 👈 ESTO SOLUCIONA EL ERROR*/
