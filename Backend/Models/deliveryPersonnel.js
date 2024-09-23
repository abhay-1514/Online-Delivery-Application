const mongoose = require('mongoose');

const deliveryPersonnelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link to the User model
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  // Optionally, include a field for tracking availability
  isAvailable: {
    type: Boolean,
    default: true
  } 
  // Other fields like vehicle type, etc., can be added as needed
});

module.exports = mongoose.model('DeliveryPersonnel', deliveryPersonnelSchema);
