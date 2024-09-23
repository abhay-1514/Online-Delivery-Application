// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the vendor who adds the product
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
