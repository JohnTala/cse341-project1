const router=require('express').Router();

const contactControllers=require('../controllers/contacts');

//route to get all contacts
router.get('/',contactControllers.getAll)

//route to get single contact
router.get('/:id',contactControllers.getSingle)

module.exports=router;