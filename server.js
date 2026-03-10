const express = require('express');
const mongodb = require('./database/db');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes'));

const PORT = process.env.PORT || 3000;

// Call initDb function
mongodb.initDb((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        app.listen(PORT, () => {
            console.log(`Listening to port ${PORT}...`);
        });
    }
});
