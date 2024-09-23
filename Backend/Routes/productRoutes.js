const express = require('express');
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require('../Controllers/productController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

// Routes for managing products
router.post('/', protect, addProduct);  // Vendors add products
router.get('/', getAllProducts);  // Customers view all products
router.put('/:id', protect, updateProduct);  // Vendors update their products
router.delete('/:id', protect, deleteProduct);  // Vendors delete their products

module.exports = router;
