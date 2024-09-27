// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../../Styles/Register.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'Customer', // Default role as Customer
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', formData);
//       if (response.data) {
//         // Redirect to login page after successful registration
//         navigate('/login');
//       }
//     } catch (error) {
//       setErrorMessage(error.response.data.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Role</label>
//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="Customer">Customer</option>
//             <option value="Vendor">Vendor</option>
//             <option value="DeliveryPersonnel">Delivery Personnel</option>
//           </select>
//         </div>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios'; // Import axios here
import { useNavigate } from 'react-router-dom';
import '../../Styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    address: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // to redirect after successful registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful:', data);
        alert("You have registered successfully. Login again to enjoy the app."); // Show alert
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
            <option value="DeliveryPersonnel">Delivery Personnel</option>
          </select>
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
