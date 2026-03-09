const express=require('express');
const mongodb=require('./database/db')

const app=express();

app.use('/',require('./routes'))

const PORT=process.env.PORT || 3000

//Call initDb function
mongodb.initDb((err)=>{
   if(err) {
       console.log(`The error is ${err.message}`)
     }
     else
        {
           app.listen(PORT,()=>{
          console.log(`Listenig to port ${PORT}...`)
        })
    }
    
})

