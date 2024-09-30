import React, { useEffect, useState } from 'react';
import { getAssignedOrders, updateOrderStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/Deliverydashboard.css'; // Import the consolidated CSS file

const DeliveryDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch assigned orders
  useEffect(() => {
    const fetchAssignedOrders = async () => {
        try {
            const response = await getAssignedOrders();

            // Check if the response is an array
            if (Array.isArray(response) && response.length > 0) {
                setOrders(response); // Set orders to the response
            } else {
                setOrders([]); // Set orders to an empty array if no orders are assigned
            }
        } catch (error) {
            console.error('Error fetching assigned orders', error);
            if (error.response) {
                // This means the server responded with a status code outside the 2xx range
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
            } else if (error.request) {
                // This means the request was made but no response was received
                console.error('Request data:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            toast.error('Failed to fetch assigned orders.');
        }
    };

    fetchAssignedOrders();
  }, []);

  // Handle updating the order status
  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
  
      // Assuming the API returns the updated order data
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
  
      toast.success(`Order marked as ${status}`);
    } catch (error) {
      console.error('Error updating order status', error);
      toast.error('Failed to update order status.');
    }
  };
  
  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/'); // Redirect to the login page
    }, 1000);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-header">Delivery Personnel Dashboard</h1>
      <button className="btn" onClick={handleLogout}>Logout</button>
      <div className="orders-section">
        <h2>Assigned Orders</h2>
        {Array.isArray(orders) && orders.length === 0 ? (
          <p>No orders assigned yet.</p>
        ) : (
          <ul className="order-list">
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <p>Order ID: {order._id}</p>
                <p>Customer Name: {order.user.name}</p>
                <p>Customer Email: {order.user.email}</p>
                <p>Customer Address: {order.user.address}</p> {/* Display customer's address */}
                <p>Status: {order.status}</p>
                <button className="btn" onClick={() => handleUpdateStatus(order._id, 'Picked Up')}>
                  Mark as Picked Up
                </button>
                <button className="btn" onClick={() => handleUpdateStatus(order._id, 'Delivered')}>
                  Mark as Delivered
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DeliveryDashboard;
