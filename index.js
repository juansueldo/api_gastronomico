require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const { syncModels } = require('./src/models');
const auth = require('./src/middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');



app.use(express.json());
// Swagger/OpenAPI config
const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Gastronómico',
			version: '1.0.0',
			description: 'Documentación de la API para el local gastronómico',
		},
		servers: [
			{ url: 'http://localhost:' + (process.env.PORT || 3000) }
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
				},
				customHeader: {
					type: 'apiKey',
					in: 'header',
					name: 'x-custom-header',
				}
			}
		},
		security: [
			{ bearerAuth: [] },
			{ customHeader: [] }
		]
	},
	apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de autenticación global
app.use(auth);

// Rutas
app.use('/clientes', require('./src/routes/clientes'));
app.use('/productos', require('./src/routes/productos'));
app.use('/mesas', require('./src/routes/mesas'));
app.use('/reservas', require('./src/routes/reservas'));
app.use('/ordenes', require('./src/routes/ordenes'));


// Ruta raíz
app.get('/', (req, res) => {
  res.send('API Gastronómico funcionando. Documentación en /api-docs');
});

// Sincronizar modelos y levantar servidor
syncModels().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en puerto ${PORT}`);
	});
}).catch(err => {
	console.error('Error al sincronizar modelos:', err);
});
