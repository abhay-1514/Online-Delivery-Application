import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import '../../Styles/Login.css'; // Adjust the path if necessary
import { login } from '../../services/api';

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
      const response = await login (formData); // Use the login method from api.js

      if (response.status === 200) {
        const data = response.data; // Define data here
        console.log('Login successful:', data);
        toast.success("Login successful!"); // Show success toast
        
        // Navigate to the respective dashboard based on user role
        if (data.role === 'Customer') {
            setTimeout(() => {
          navigate('/customerdashboard');
            },1000);
        } else if (data.role === 'Vendor') {
            setTimeout(() => {
          navigate('/vendordashboard');
        },1000);
        } else if (data.role === 'DeliveryPersonnel') {
            setTimeout(() => {
          navigate('/deliverypersonneldashboard');
        },1000);
        }
      } else {
        // Handle case where response is not 200
        const errorMessage = response.data.message || "Login failed. Please try again.";
        setError(errorMessage);
        toast.error(errorMessage); // Show error toast
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.'); // Show error toast
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
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default Login;
