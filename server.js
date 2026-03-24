const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const mongodb = require('./database/db');

// Catch sync errors
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION ', err);
  process.exit(1);
});

const app = express();

// Middleware
app.use(cors());
app.options('*', cors()); // Preflight for PUT/POST/DELETE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/contacts', require('./routes/contacts')); // Mount contacts router

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler
app.use((err, req, res, next) => {
  console.error('ERROR ', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 3000;

// Start server AFTER DB connects
mongodb.initDb((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  } else {
    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });

    // Handle async errors
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION ', err);
      server.close(() => process.exit(1));
    });
  }
});
