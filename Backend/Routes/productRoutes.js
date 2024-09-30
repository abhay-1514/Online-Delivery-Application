const express = require('express');
const multer = require('multer');  // Import multer for handling file uploads
const {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getVendorProducts,
} = require('../Controllers/productController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});   

const upload = multer({ storage: storage });  

// Routes for managing products
router.post('/', protect, upload.single('image'), addProduct);  // Vendors add products with image
router.get('/', getAllProducts);  // Customers view all products
router.get('/vendor', protect, getVendorProducts); // Vendor view his own products
router.put('/:id', protect, upload.single('image'), updateProduct);  // Vendors update their products with image
router.delete('/:id', protect, deleteProduct);  // Vendors delete their products

module.exports = router;
