// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import VendorDashboard from './components/Dashboard/VendorDashboard';
import DeliveryDashboard from './components/Dashboard/DeliveryDashboard';
import VendorOrders from './components/Orders/venderOrders';
import HomePage from '../src/pages/HomePage';
import { CartProvider } from './context/cartContext'; 
import CartPage from './pages/cartPage';

const App = () => {
  return (
    <CartProvider> {/* Wrap the app with CartProvider to provide cart state */}
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customerdashboard" element={<CustomerDashboard />} />
        <Route path="/vendordashboard" element={<VendorDashboard />} />
        <Route path="/vendordashboard/orders" element={<VendorOrders />} />
        <Route path="/deliverydashboard" element={<DeliveryDashboard />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    </CartProvider>
  );
};

export default App;
