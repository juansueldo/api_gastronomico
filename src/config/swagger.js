const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gastronómico',
      version: '1.0.0',
      description: 'Documentación de la API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // donde están tus endpoints
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
