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

// Middleware JSON
app.use(express.json());

// Swagger y archivos estáticos ANTES de auth
if (process.env.NODE_ENV !== 'production') {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/', (req, res) => res.redirect('/docs'));
} else {
  // En producción, redirigir / y /docs a /docs.html
  app.get('/', (req, res) => res.redirect('/docs.html'));
  app.get('/docs', (req, res) => res.redirect('/docs.html'));
  // Permitir acceder a docs.html también como /docs (sin extensión)
  app.get('/docs', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'docs.html'));
  });
}

// Servir archivos estáticos (incluye docs.html, swagger.json, etc.)
app.use(express.static(path.join(process.cwd(), 'public')));

// Proteger el resto de rutas
app.use(auth);

// Rutas protegidas
app.use('/clientes', require('./src/routes/clientes'));
app.use('/productos', require('./src/routes/productos'));
app.use('/mesas', require('./src/routes/mesas'));
app.use('/reservas', require('./src/routes/reservas'));
app.use('/ordenes', require('./src/routes/ordenes'));

module.exports = app;