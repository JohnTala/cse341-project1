require('dotenv').config();
const mongodb=require('mongodb').MongoClient;

//Initialize datase

let database;

const initDb=(fn)=>{
    if(database){
        console.log('Database initialized')
       return fn(null,database)
    }
    mongodb.connect(process.env.MONGODB_URI)
    .then((client)=>{
        database=client
        fn(null,database)
    })
    .catch(err=>{
        fn(err)
    })
}

//If database not initialized

const getDatabase=()=>{
     if(!database){
        throw Error('Database not initialized')
    }
    return database
}

module.exports={
    initDb,
    getDatabase
}