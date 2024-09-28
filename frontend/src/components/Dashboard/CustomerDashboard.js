import React, { useState, useEffect } from 'react';
import { getAllProducts, placeOrder } from '../../services/api'; // Use your API methods
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/CustomerDashboard.css'; // Create CSS file for styling

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  // Add product to cart (with quantity management)
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.product._id === product._id);

    if (existingProductIndex >= 0) {
      // If the product already exists in the cart, increase the quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the product doesn't exist in the cart, add it with quantity 1
      setCart([...cart, { product, quantity: 1 }]);
    }

    toast.success('Product added to cart!');
  };

  // Remove product from cart (decrease quantity or remove if quantity is 0)
  const removeFromCart = (productId) => {
    const existingProductIndex = cart.findIndex(item => item.product._id === productId);

    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];

      // Decrease quantity or remove the item
      if (updatedCart[existingProductIndex].quantity > 1) {
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingProductIndex, 1); // Remove the product if quantity is 1
      }

      setCart(updatedCart);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Place order for all products in cart
  const handlePlaceOrder = async () => {
    const orderDetails = {
      products: cart.map(item => ({
        product: item.product._id,  // Ensure this is the correct ID for your product
        quantity: item.quantity
      }))
    };
  
    console.log("Order Details to be sent:", orderDetails); // Log the order details being sent
  
    try {
      const response = await placeOrder(orderDetails);
      
      // Check if response data is structured as expected
      if (response && response.data) {
        const { message, order } = response.data;
        console.log("Success Message:", message);  // Log the success message
        console.log("Placed Order Details:", order); // Log order details
  
        // Show a success notification
        toast.success(message);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Error placing order.');
    }
  };

  return (
    <div className="customer-dashboard">
      <h1>Customer Dashboard</h1>

      {/* Product Listing */}
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

      {/* Cart Section */}
      <section className="cart-section">
        <h2>Your Cart</h2>
        <ul>
          {cart.length > 0 ? (
            cart.map(({ product, quantity }) => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>Price: Rs.{product.price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={() => removeFromCart(product._id)}>Remove</button>
                <button>Buy Now</button>
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
        <h3>Total Amount: Rs.{calculateTotal()}</h3>
        <button onClick={handlePlaceOrder}>Place Order for All</button>
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
