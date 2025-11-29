const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// POST /api/v1/user/signup
exports.signupUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors. array() });
    }

    const { username, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully.',
      user_id: newUser._id
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// POST /api/v1/user/login
exports.loginUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username/email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username/email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

