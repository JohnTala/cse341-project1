const express=require('express');
require('dotenv').config();

const app=express();

app.use('/',require('./routes'))

const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Listenig to port ${PORT}...`)
})