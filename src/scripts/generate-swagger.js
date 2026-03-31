// Script para generar swagger.json a partir de tu configuración actual
const fs = require('fs');
const swaggerSpec = require('../src/config/swagger');

fs.writeFileSync(
  __dirname + '/../public/swagger.json',
  JSON.stringify(swaggerSpec, null, 2)
);

console.log('swagger.json generado en /public');
