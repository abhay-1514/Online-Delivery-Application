import React, { useState, useEffect } from 'react';
import { getVendorOrders, assignDeliveryPersonnel } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState(''); // To assign delivery personnel
  
  // Fetch orders for the vendor
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getVendorOrders();
        setOrders(response.data);
      } catch (error) {
        toast.error('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, []);

  // Handle assigning delivery personnel
  const handleAssignDelivery = async (orderId) => {
    try {
      await assignDeliveryPersonnel(orderId, deliveryPersonnel);
      toast.success('Delivery personnel assigned successfully');
    } catch (error) {
      toast.error('Failed to assign delivery personnel.');
    }
  };

  return (
    <div>
      <h1>Vendor Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <h3>Product: {order.product.name}</h3>
              <p>Order Status: {order.status}</p>
              <p>Assigned Delivery Personnel: {order.deliveryPersonnel ? order.deliveryPersonnel.name : 'None'}</p>
              <input
                type="text"
                placeholder="Enter Delivery Personnel ID"
                value={deliveryPersonnel}
                onChange={(e) => setDeliveryPersonnel(e.target.value)}
              />
              <button onClick={() => handleAssignDelivery(order._id)}>
                Assign Delivery Personnel
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available.</p> 
      )}

      <ToastContainer />
    </div>
  );
};

export default VendorOrders;
