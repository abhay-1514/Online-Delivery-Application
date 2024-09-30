const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const deliveryRoutes = require('./Routes/deliveryRoutes');
const imageRouter = require('./Routes/imageRouter');
require('dotenv').config({ path: './dotENV/.env' }); // Adjust the path based on the new location of your .env file
const BASE_URL = process.env.BASE_URL;

connectDB(); 

const app = express();  

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware
app.use(express.json()); // For parsing application/json
app.use('/uploads', imageRouter);
// Routes
app.use(`${BASE_URL}/api/users`, userRoutes); // User routes
app.use(`${BASE_URL}/api/products`, productRoutes); // Product routes
app.use(`${BASE_URL}/api/orders`, orderRoutes); // Order routes
app.use(`${BASE_URL}/api/delivery`,deliveryRoutes);// Delivery Routes
   
app.use(`${BASE_URL}/api/uploads`, express.static('uploads'));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
