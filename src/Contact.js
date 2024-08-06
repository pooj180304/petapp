import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
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
      <div className="contact-content">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">Get in touch with us for any inquiries or support.</p>
      </div>
    </div>
  );
}

export default Contact;
