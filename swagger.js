const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the Contacts project',
    version: '1.0.0'
  },
  host: process.env.SWAGGER_HOST || '', // Dynamic host
  basePath: '/',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

const outputFile = './swagger.json';
const endpointsFiles = [
  './routes/index.js',
  './routes/contacts.js' // Include contacts routes
];

swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    console.log('Contacts Swagger documentation generated!');
  });
