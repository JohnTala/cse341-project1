require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Initialize database
let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database already initialized');
        return callback(null, database);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client; // get the actual database
            console.log('Database connected');
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

// If database not initialized
const getDatabase = () => {
    if (!database) {
        throw new Error('Database not initialized');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
