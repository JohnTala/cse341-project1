const express = require('express');
const mongodb = require('./database/db');
const body_parser=require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();

// Middleware
app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin X-Requested-With,Content-Type,Accept,Z-Key');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
   next();
})

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
