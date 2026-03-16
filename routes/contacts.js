const router=require('express').Router();

const contactControllers=require('../controllers/contacts')

//route to get all contacts
router.get('/',contactControllers.getAllContacts)

//route to get single contacts
router.get('/:id',contactControllers.getSingleContact)

//route to create contact
router.post('/',contactControllers.createContact)

//route to update contact
router.put('/:id',contactControllers.updateContact)

//route to delete contact

router.delete('/:id',contactControllers.deleteContact)

module.exports=router;