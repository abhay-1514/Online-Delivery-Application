// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CustomerDashboard from './components/Dashboard/CustomerDashboard';
import VendorDashboard from './components/Dashboard/VendorDashboard';
import DeliveryDashboard from './components/Dashboard/DeliveryDashboard';
import HomePage from '../src/pages/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
