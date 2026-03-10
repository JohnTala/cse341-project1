const router=require('express').Router();

const contactControllers=require('../controllers/contacts')

//route to get all contacts
router.get('/',contactControllers.getAllContacts)

//route to get single contacts
router.get('/:id',contactControllers.getSingleContact)

module.exports=router