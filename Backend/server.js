const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes');

require('dotenv').config({ path: './dotENV/.env' }); // Adjust the path based on the new location of your .env file

connectDB(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
