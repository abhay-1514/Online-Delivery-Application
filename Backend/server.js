const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const deliveryRoutes = require('./Routes/deliveryRoutes');
const imageRouter = require('./Routes/imageRouter');
//require('dotenv').config({ path: './dotENV/.env' }); // Adjust the path based on the new location of your .env file
dotenv.config();
connectDB(); 

const app = express();  

app.use(cors());

// Middleware
app.use(express.json()); // For parsing application/json
app.use('/uploads', imageRouter);
// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/delivery',deliveryRoutes);// Delivery Routes
   
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
