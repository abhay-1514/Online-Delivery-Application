const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel' },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
