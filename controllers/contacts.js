const mongodb = require('../database/db');
const ObjectId = require('mongodb').ObjectId; // primary MongoDB Id

const getAll = async (req, res) => {
    const allContacts = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find();

    allContacts.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    const id = new ObjectId(req.params.id);

    const allContacts = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find({ _id: id });

    allContacts.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

module.exports = {
    getAll,
    getSingle
};
