import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch assigned orders
  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/delivery/assigned-orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching assigned orders', error);
      }
    };

    fetchAssignedOrders();
  }, []);

  // Handle updating the order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/delivery/update-order-status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    toast.success('Logged out successfully!');
    setTimeout(()=>{
      navigate('/');// Redirect to the login page
    },1000);      
  };

  return (
    <div className="delivery-dashboard">
      <h1>Delivery Personnel Dashboard</h1>
      <div className="orders-section">
        <h2>Assigned Orders</h2>
        {orders.length === 0 ? (
          <p>No orders assigned yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <p>Order ID: {order._id}</p>
                <p>Customer: {order.customerName}</p>
                <p>Status: {order.status}</p>
                <button
                  onClick={() => handleUpdateStatus(order._id, 'Picked Up')}
                >
                  Mark as Picked Up
                </button>
                <button
                  onClick={() => handleUpdateStatus(order._id, 'Delivered')}
                >
                  Mark as Delivered
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
