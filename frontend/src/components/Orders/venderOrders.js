import React, { useState, useEffect } from 'react';
import { getVendorOrders, getDeliveryPersonnel, assignDeliveryPersonnel } from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import '../../Styles/VendorOrders.css';
import 'react-toastify/dist/ReactToastify.css';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]); // Initialize as an empty array
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]); // Initialize as an empty array
  const [selectedDP, setSelectedDP] = useState(''); // Initialize as an empty string
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchOrdersAndPersonnel = async () => {
      try {
        const orderResponse = await getVendorOrders();
        console.log(orderResponse); // Log the order response to check its structure
        setOrders(orderResponse || []); // Update the orders state

        const dpResponse = await getDeliveryPersonnel();
        setDeliveryPersonnel(dpResponse || []); // Update the delivery personnel state
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
        toast.error('Failed to fetch data.');
      }
    };

    fetchOrdersAndPersonnel();
  }, []);

  const handleAssignDelivery = async (orderId) => {
    try {
      await assignDeliveryPersonnel(orderId, selectedDP);
      const updatedOrder = await getVendorOrders();
      console.log(updatedOrder); // Log updated orders after assignment
      setOrders(updatedOrder);
      toast.success('Delivery personnel assigned successfully');
    } catch (error) {
      toast.error('Failed to assign delivery personnel.');
    }
  };

  const handleBackToDashboard = () => {
    navigate('/vendordashboard'); // Change this path to your vendor dashboard route
  };

  return (
    <div>
      <h1>Vendor Orders</h1>
      <button onClick={handleBackToDashboard}>Back to Dashboard</button> {/* Back to dashboard button */}
      {orders.length > 0 ? ( // Simplified the condition
        <ul>
          {orders.map((order) => {
            // Find the assigned delivery personnel
            const assignedDP = deliveryPersonnel.find(dp => dp._id === order.deliveryPersonnel);
            
            return (
              <li key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p>Customer: {order.user.name}</p>
                <p>Email: {order.user.email}</p>
                <h4>Products:</h4>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      <strong>{product.product.name}</strong>
                      <p>Quantity: {product.quantity}</p>
                      <p>Price: ${product.price}</p>
                    </li>
                  ))}
                </ul>
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Order Status: {order.status}</p>
                <p>Assigned Delivery Personnel: {assignedDP ? assignedDP.name : 'None'}</p>
                <select value={selectedDP} onChange={(e) => setSelectedDP(e.target.value)}>
                  <option value="">Select Delivery Personnel</option>
                  {deliveryPersonnel.map((dp) => (
                    <option key={dp._id} value={dp._id}>{dp.name}</option>
                  ))}
                </select>
                <button onClick={() => handleAssignDelivery(order._id)}>
                  Assign Delivery Personnel
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No orders available.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default VendorOrders;
