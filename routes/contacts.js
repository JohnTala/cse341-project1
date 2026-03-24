const router=require('express').Router();
const {body}=require('express-validator');

const contactControllers=require('../controllers/contacts')

const contactValidator=[
    body('firstName')
                .notEmpty()
                .withMessage('First Name is required,can not be empty'),
    body('lastName')
                .notEmpty()
                .withMessage('Last Name is required,can not be empty'),
    body('email')
                .isEmail()
                .withMessage('Valid email is required'),
    body('favoriteColor')
                .notEmpty()
                .withMessage('Color is required,can not be empty'),
    body('birthday')
                 .notEmpty()
                 .withMessage('birthday is required')
    
]


//route to get all contacts
router.get('/',contactControllers.getAllContacts)

//route to get single contacts
router.get('/:id',contactControllers.getSingleContact)

//route to create contact
router.post('/',contactValidator,contactControllers.createContact)

//route to update contact
router.put('/:id',contactValidator,contactControllers.updateContact)

//route to delete contact

router.delete('/:id',contactControllers.deleteContact)

module.exports=router;