// src/services/api.js
import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this URL as per your backend
});

const API_URL = 'http://localhost:5000/api';

// Auth request for login
export const login = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData);
    return response; // Return the entire response
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network error'); // Throw the response data directly
  }
};

// Auth request for registration
export const register = async (data) => {
  return api.post('/users/register', data);
};

// Fetch user orders
export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
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
  try {
    const response = await axios.post(`${API_URL}/products`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all products added by the vendor
export const getVendorProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, updatedProductData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/products/${productId}`, updatedProductData, {
      headers: {
        Authorization: `Bearer ${ token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignDeliveryPersonnel = async (orderId, personnelId) => {
  const token = localStorage.getItem('token');
  return axios.put(`http://localhost:5000/api/orders/${orderId}/assign`, 
    { personnelId }, 
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


export const getAllProducts = async () => {
  return await axios.get('http://localhost:5000/api/products/');
};

export const placeOrder = async (orderDetails) => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/orders/place`, orderDetails , {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch(error){
    throw error;
  }
};

export const getVendorOrders = async () => {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/orders/vendor-orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
  });
  return response.data;
} catch(error){
    throw error;
}
};

export const fetchDetails = async ()=> {
  try{
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/users/userdetails`,{
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
} catch(error){
  throw error;
}
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; // Assuming the response contains the users array
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (userId) => {
  try {
    await axios.put(`${API_URL}/users/block/${userId}`);
  } catch (error) {
    throw error;
  }
};

export const unblockUser = async (userId) => {
  try {
    await axios.put(`${API_URL}/users/unblock/${userId}`);
  } catch (error) {
    throw error;
  }
};