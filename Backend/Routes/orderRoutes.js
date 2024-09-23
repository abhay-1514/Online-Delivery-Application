const express = require('express');
const { 
  placeOrder, 
  getUserOrders, 
  updateOrderStatus, 
  assignOrderToDeliveryPersonnel, 
  getAssignedOrdersForDeliveryPersonnel // Import the function
} = require('../Controllers/orderController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/place', protect, placeOrder); 
router.get('/myorders', protect, getUserOrders); 
router.put('/:id/status', protect, updateOrderStatus); 
router.put('/assign-delivery', protect, assignOrderToDeliveryPersonnel); 

// New route for delivery personnel to get assigned orders
router.get('/assigned-orders', protect, getAssignedOrdersForDeliveryPersonnel); 

module.exports = router;
