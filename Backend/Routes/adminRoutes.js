const express = require('express');
const { protect, admin } = require('../Middleware/authMiddleware');
const router = express.Router();

router.get('/admin-only', protect, admin, (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

module.exports = router;
