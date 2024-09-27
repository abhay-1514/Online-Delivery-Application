import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Online Delivery Application</h1>
      <div className="button-group">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
