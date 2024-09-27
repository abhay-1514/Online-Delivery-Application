// src/services/api.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this URL as per your backend
});

// Auth request for login
export const login = async (data) => {
  return api.post('/users/login', data);
};

// Auth request for registration
export const register = async (data) => {
  return api.post('/users/register', data);
};

// Fetch user orders
export const getUserOrders = async (token) => {
  return api.get('/orders/myorders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fetch assigned orders for delivery personnel
export const getAssignedOrders = async (token) => {
  return api.get('/orders/assigned', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
