const express = require('express');
const { 
  placeOrder, 
  getUserOrders, 
  updateOrderStatus, 
  assignOrderToDeliveryPersonnel, 
  getAssignedOrdersForDeliveryPersonnel,
  getVendorOrders // Import the function
} = require('../Controllers/orderController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/place', protect, placeOrder); 
router.get('/myorders', protect, getUserOrders); 
router.put('/:id', protect, updateOrderStatus); 
router.get('/vendor-orders', protect, getVendorOrders);
router.put('/:orderId/assign-delivery', protect, assignOrderToDeliveryPersonnel); 

// New route for delivery personnel to get assigned orders
router.get('/assigned-orders', protect, getAssignedOrdersForDeliveryPersonnel); 

module.exports = router;
