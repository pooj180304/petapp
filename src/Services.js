import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

function Services() {
  return (
    <div className="services-container">
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
      <div className="services-content">
        <h1 className="services-title">Our Services</h1>
        <p className="services-description">Discover the services we offer to keep your pets happy and healthy.</p>
      </div>
    </div>
  );
}

export default Services;
