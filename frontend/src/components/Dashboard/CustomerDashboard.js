import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts, getUserOrders } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../../context/cartContext';  // Import Cart Context
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const { cart, setCart } = useContext(CartContext);  // Use cart and setCart from context
  const navigate = useNavigate(); // Initialize useNavigate

  const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
const userName = storedUserDetails?.name || 'User'; // Default to 'User' if name is not available


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        toast.error('Failed to fetch products.');
      }
    };
    fetchProducts();

    const fetchOrders = async () => {
      try {
          const response = await getUserOrders();
          console.log("Full Response:", response); // Log the entire response object
          console.log("Response Data:", response); // Log response directly
  
          // Check if the response is an array and has orders
          if (Array.isArray(response) && response.length > 0) {
              setOrders(response); // Set orders directly from response
          } else {
              setOrders([]); // Set orders to empty if not found
          }
      } catch (error) {
          console.error("Error fetching orders:", error);
          toast.error('Failed to fetch orders.');
          setOrders([]); // Set orders to an empty array if there's an error
      }
  };
  fetchOrders();
}, []);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.product._id === product._id);
    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success('Product added to cart!');
  };

  // Navigate to Cart Page
  const goToCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    toast.success('Logged out successfully!');
    setTimeout(() => {
      navigate('/'); // Redirect to the login page
    }, 1000);      
  };

  return (
    <div className="customer-dashboard">
      <h1>Customer Dashboard</h1>

      {/* Welcome message */}
      <h2>Welcome back, {userName}!</h2>  {/* Display the user's name here */}

      <button className="cart-button" onClick={goToCart}>
        Go to Cart ({cart.length})
      </button>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <section className="products-section">
  <h2>All Products</h2>
  <ul>
    {products.map(product => (
      <li key={product._id}>
        <img src={product.imageUrl} alt={product.name} />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: Rs.{product.price}</p>
        </div>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </li>
    ))}
  </ul>
</section>

       {/* Customer Orders Section */}
       <section className="orders-section">
  <h2>Your Orders</h2>
  {orders.length === 0 ? (
    <p>No orders found.</p>
  ) : (
    <ul>
      {orders.map(order => (
        <li key={order._id}>
          <h3>Order Id:#{order._id}</h3>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Total: Rs.{order.totalAmount}</p>
          <ul>
            {order.products.map(({ product, quantity }) => (
              <li className='name' key={product._id}>
                {product ? product.name : 'Product not available'} - Rs.{product ? product.price : 'N/A'} (Quantity: {quantity})
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )}
</section>



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CustomerDashboard;
