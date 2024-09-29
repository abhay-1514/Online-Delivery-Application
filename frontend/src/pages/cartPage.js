import React, { useContext } from 'react';
import { CartContext } from '../context/cartContext';
import { placeOrder } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/cartPage.css'

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    const existingProductIndex = cart.findIndex(item => item.product._id === productId);
  
    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
  
      if (updatedCart[existingProductIndex].quantity > 1) {
        // Decrease the quantity by 1 if it's more than 1
        updatedCart[existingProductIndex].quantity -= 1;
      } else {
        // Remove the product from the cart if the quantity is 1
        updatedCart.splice(existingProductIndex, 1);
      }
  
      setCart(updatedCart);
    }
  };
  

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const handlePlaceOrder = async () => {
    const orderDetails = {
      products: cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await placeOrder(orderDetails);
      console.log(response)
      setTimeout(()=>{
        toast.success('Order Placed Successfully');
      },3000);
      setCart([]); // Clear cart after placing order
    } catch (error) {
      toast.error('Error placing order.');
    }
  };

  const goBackToDashboard = () => {
    navigate('/customerdashboard');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <ul>
        {cart.length > 0 ? (
          cart.map(({ product, quantity }) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: Rs.{product.price}</p>
              <p>Quantity: {quantity}</p>
              <button onClick={() => removeFromCart(product._id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </ul>
      <h3>Total Amount: Rs.{calculateTotal()}</h3>
      {cart.length > 0 && <button onClick={handlePlaceOrder}>Place Order</button>}

       {/* Back to Dashboard Button */}
       <button className="back-button" onClick={goBackToDashboard}>
        Back to Dashboard
      </button>
      <ToastContainer />
    </div>
  );
};

export default CartPage;
