const mongodb = require('../database/db');
const objectId = require('mongodb').ObjectId; // primary key 
const {validationResult}=require('express-validator')

//function to get all contacts
const getAllContacts = async (req, res) => {
    //##swagger.tags=['Contacts']
    try {
        const allContacts = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(allContacts);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//function to get a single contact
const getSingleContact = async (req, res) => {
     //##swagger.tags=['Contacts']
    try {
        const id = new objectId(req.params.id);

        const contact = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .findOne({ _id: id });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//function to create contact
const createContact = async (req, res) => {
     //##swagger.tags=['Contacts']

     const errors=validationResult(req)
     if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
     }
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const resp = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .insertOne(contact);

        if (resp.acknowledged) {
            res.status(201).json(resp.insertedId);
        } else {
            res.status(500).json(resp.error || 'Some error happened when inserting new contact');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

//function to update contact
const updateContact = async (req, res) => {
     //##swagger.tags=['Contacts']
    try {
        const id = new objectId(req.params.id);

        const updatedContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const resp = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .replaceOne({ _id: id }, updatedContact);

        if (resp.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(resp.error || 'Some error occured while updating contact');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//function to delete an account
const deleteContact = async (req, res) => {
     //##swagger.tags=['Contacts']
    try {
        const id = new objectId(req.params.id);

        const resp = await mongodb
            .getDatabase()
            .db()
            .collection('contacts')
            .deleteOne({ _id: id });

        if (resp.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(resp.error || 'Some error occured while deleting contact');
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
