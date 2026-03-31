require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { syncModels } = require('./src/models');
const auth = require('./src/middleware/auth');


app.use(express.json());
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
	res.send('API Gastronómico funcionando');
});

// Sincronizar modelos y levantar servidor
syncModels().then(() => {
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en puerto ${PORT}`);
	});
}).catch(err => {
	console.error('Error al sincronizar modelos:', err);
});
