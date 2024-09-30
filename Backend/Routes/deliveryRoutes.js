// Routes/deliveryRoutes.js
const express = require('express');
const { getDeliveryPersonnel } = require('../Controllers/deliveryController');
const router = express.Router();

router.get('/personnel', getDeliveryPersonnel); // Route to get all delivery personnel

module.exports = router;
