const express = require('express');
const { registerUser, loginUser, getUserDetails } = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// GET user details
router.get('/userdetails', protect, getUserDetails);  

module.exports = router;
