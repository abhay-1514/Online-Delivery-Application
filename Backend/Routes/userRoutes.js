const express = require('express');
const { registerUser, loginUser, getUserDetails, getUsers, blockUser, unblockUser } = require('../Controllers/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// GET user details
router.get('/userdetails', protect, getUserDetails);  

// Fetch all users (for admin)
router.get('/', getUsers);
  
  // Block User
  router.put('/block/:id', blockUser );
  
  // Unblock User
  router.put('/unblock/:id', unblockUser);

module.exports = router;
