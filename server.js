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
   next();
})

// Routes
app.use('/', require('./routes'));


process.on('uncaughtException',(err)=>{
    console.log(`Uncaught Error ${err}`)
    process.exit(1);//This stops the app safely
})
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
