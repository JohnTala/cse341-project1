const mongodb=require('../database/db');
const objectId=require('mongodb').ObjectId;//primary key 


const getAllContacts=async(req,res)=>{
    const allContacts= await mongodb
             .getDatabase()
             .db()
             .collection('contacts')
             .find();
         allContacts.toArray().then((contacts)=>{
            res.setHeader('Content-Type','application/json')
            res.status(200).json(contacts)
         })
}
const getSingleContact=async(req,res)=>{
    const id=new  objectId(req.params.id)
    const allContacts= await mongodb
             .getDatabase()
             .db()
             .collection('contacts')
             .find({_id:id});
         allContacts.toArray().then((contacts)=>{
            res.setHeader('Content-Type','application/json')
            res.status(200).json(contacts[0])
         })
}

module.exports={
    getAllContacts,
    getSingleContact
}