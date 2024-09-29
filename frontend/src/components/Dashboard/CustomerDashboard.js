import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts } from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '../../context/cartContext';  // Import Cart Context
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/CustomerDashboard.css';

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);  // Use cart and setCart from context
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Use location to access passed state

  // Retrieve user's name from location state
  const userName = location.state?.userDetails?.name || 'User'; // Default to 'User' if name is not available

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
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: Rs.{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
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
