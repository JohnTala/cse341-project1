const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const db = require('./database/db'); 

const app = express();

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Swagger route FIRST
// --------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --------------------
// Root route
// --------------------
app.get('/', (req, res) => {
  res.send('Hello world and people');
});

// --------------------
// Normal routes
// --------------------
app.use('/contacts', require('./routes/contacts'));

// --------------------
// Global error handler
// --------------------
app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack || err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// --------------------
// Catch unhandled promise rejections
// --------------------
process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

// --------------------
// Catch uncaught exceptions
// --------------------
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err.stack || err);
  process.exit(1); // exit safely
});

// --------------------
// Connect to MongoDB & start server
// --------------------
db.initDb((err) => {
  if (err) {
    console.error('Cannot connect to the database!', err);
    process.exit(1);
  } else {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  }
});
