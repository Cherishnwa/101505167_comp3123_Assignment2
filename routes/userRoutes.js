const express = require('express');
const { body } = require('express-validator');
const { signupUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');



const router = express.Router();



router.post(
  '/signup',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  signupUser
);
router.post('/login', loginUser);

module.exports = router;
