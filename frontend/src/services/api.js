// src/services/api.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this URL as per your backend
});

const getAuthToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from local storage
};

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

// Add a product
export const addProduct = async (productData) => {
    const token = getAuthToken();
    try {
    const response = api.post('/products/', productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
} catch (error) {
    throw error; // Rethrow the error for handling in the calling function
}
};

// Get all products added by the vendor
export const getVendorProducts = async () => {
    const token = getAuthToken();
  return api.get('/products', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update a product
export const updateProduct = async (id, productData) => {
    const token = getAuthToken();
  return api.put(`/products/${id}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Delete a product
export const deleteProduct = async (id) => {
    const token = getAuthToken();
  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
