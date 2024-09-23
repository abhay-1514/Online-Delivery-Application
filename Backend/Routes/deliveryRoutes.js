// Routes/deliveryRoutes.js
const express = require('express');
const { addDeliveryPersonnel, getDeliveryPersonnel } = require('../Controllers/deliveryController');
const router = express.Router();

router.post('/add', addDeliveryPersonnel); // Route to add delivery personnel
router.get('/', getDeliveryPersonnel); // Route to get all delivery personnel

module.exports = router;
