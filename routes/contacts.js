const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const contactControllers = require('../controllers/contacts');

// Validation middleware
const contactValidator = [
  body('firstName').notEmpty().withMessage('First Name is required'),
  body('lastName').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('favoriteColor').notEmpty().withMessage('Favorite Color is required'),
  body('birthday').notEmpty().withMessage('Birthday is required')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Routes
router.get('/', contactControllers.getAllContacts);
router.get('/:id', contactControllers.getSingleContact);
router.post('/', contactValidator, handleValidationErrors, contactControllers.createContact);
router.put('/:id', contactValidator, handleValidationErrors, contactControllers.updateContact);
router.delete('/:id', contactControllers.deleteContact);

module.exports = router;
