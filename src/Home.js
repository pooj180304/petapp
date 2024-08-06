import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="navbar__logo">Happy Paws</div>
        <div className="navbar__links">
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/about" className="navbar__link">About</Link>
          <Link to="/services" className="navbar__link">Services</Link>
          <Link to="/contact" className="navbar__link">Contact</Link>
        </div>
        <div>
        <Link to="/register" className="navbar__button">Register</Link>
        &nbsp;&nbsp;
        <Link to="/login" className="navbar__button">Login</Link>
        </div>
      </nav>
      <div className="home-content">
        <h1 className="home-title">Welcome to Happy Paws</h1>
        <p className="home-description">Where Every Wag and Purr Brings Joy!</p>
        <Link to="/login" className="home-login-button">Login</Link>
      </div>
    </div>
  );
}

export default Home;
