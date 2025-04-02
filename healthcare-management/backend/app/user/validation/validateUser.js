import { body, validationResult } from 'express-validator';

// Validation logic for user registration
export const validateUserRegistration = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name should only contain alphabetic characters'),
  
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name should only contain alphabetic characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('mobileNumber')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isLength({ min: 10, max: 10 })
    .withMessage('Mobile number must be 10 digits')
    .isNumeric()
    .withMessage('Mobile number must be numeric'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long'),

  // Validation result middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
