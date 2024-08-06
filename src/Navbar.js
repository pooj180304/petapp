import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">PetStore</Link>
        <ul className="navbar-menu">
          <li><Link to="/about" className="navbar-link">About</Link></li>
          <li><Link to="/contact" className="navbar-link">Contact</Link></li>
          <li><Link to="/help" className="navbar-link">Help</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
