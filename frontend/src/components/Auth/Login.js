import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/Login.css'; // Adjust the path if necessary
import { login, fetchDetails } from '../../services/api'; // Import fetchDetails

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData); // Use the login method from api.js

      if (response.status === 200) {
        const data = response.data; // Define data here
        console.log(data);
        console.log('Login successful:', data);
        toast.success("Login successful!"); // Show success toast

        localStorage.setItem('token', data.token); // Store the token

        // Fetch user details
        const userDetails = await fetchDetails(); // Call fetchDetails to get user info
        console.log('User Details:', userDetails); // Log user details if needed
        localStorage.setItem('userDetails', JSON.stringify(userDetails)); // Store user details in localStorage


        // Navigate to the respective dashboard based on user role
        if (data.role === 'Customer') {
          setTimeout(() => {
            navigate('/customerdashboard', { state: { userDetails } });
          }, 1000);
        } else if (data.role === 'Vendor') {
          setTimeout(() => {
            navigate('/vendordashboard', { state: { userDetails } });
          }, 1000);
        } else if (data.role === 'DeliveryPersonnel') {
          setTimeout(() => {
            navigate('/deliverydashboard', { state: { userDetails } });
          }, 1000);
        }
      } else {
        // Handle case where response is not 200
      const errorMessage = response.data.message || "Login failed. Please try again.";
      setError(errorMessage);
      if (errorMessage.includes('blocked')) {
        setTimeout(() => {
          toast.error("Your account is blocked. Please contact support."); // Show blocked user toast
        }, 3000);
      } else {
        toast.error(errorMessage); // Show error toast for other errors
      }
      }
    } catch (err) {
      console.error('Error during login:', err);
      // Check if the error has a response object and message
      const errorMessage = err.message || 'An error occurred. Please try again later.';
      // Check if err has a response and is structured correctly
      if (err.message && err.message.includes('blocked')) {
        setError("Your account is blocked. Please contact support.");
        toast.error("Your account is blocked. Please contact support."); // Show blocked user toast
      } else {
        setError(errorMessage);
        toast.error(errorMessage); // Show generic error toast
      }  
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
