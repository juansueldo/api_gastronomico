// Suprimir warnings de Node.js
process.removeAllListeners('warning');
process.on('warning', () => {});

require('dotenv').config();
const express = require('express');
const app = express();

const auth = require('./src/middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/config/swagger');



const path = require('path');
// Middleware
app.use(express.json());

// Servir docs.html y swagger.json explícitamente antes de auth
app.get('/docs.html', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'public', 'docs.html'));
});
app.get('/swagger.json', (req, res) => {
	res.sendFile(path.join(process.cwd(), 'public', 'swagger.json'));
});

// Servir archivos estáticos de /public antes de auth (por si hay otros assets)
app.use(express.static('public'));



// Swagger visible en desarrollo o si SWAGGER_ENABLE=true
if (process.env.NODE_ENV !== 'production' || process.env.SWAGGER_ENABLE === 'true') {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get('/', (req, res) => {
		res.redirect('/docs');
	});
}

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
