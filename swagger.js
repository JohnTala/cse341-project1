const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API documentation for the Contacts project',
    version: '1.0.0'
  },
  host: process.env.SWAGGER_HOST || '', // Dynamic host works locally & on Render
  basePath: '/',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json']
};

// Output file
const outputFile = './swagger.json';

// Include all route files
const endpointsFiles = [
  './routes/index.js',
  './routes/contacts.js'
];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Contacts Swagger documentation generated successfully!');
});
