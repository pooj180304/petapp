import React from 'react';
import { Link } from 'react-router-dom';
import './MenuPage.css';

function MenuPage() {
  const categories = ['Dogs', 'Cats', 'Birds', 'Fish', 'Reptiles', 'Small Pets'];
  const images = [
    'dog.jpg',
    'cat.jpg',
    'bird.jpg',
    'fish1.jpg',
    'reptile.jpg',
    'smallpet.jpg'
  ];

  return (
    <div className="menu-container">
      <nav className="navbar">
        <div className="navbar__logo">Happy Paws</div>
        
        <div className="navbar__search">
          <input type="text" placeholder="Search..." className="navbar__search-input" />
        </div>
        <div>
          <Link to="/cart" className="navbar__button">Cart</Link>
        </div>
      </nav>
      <div className="menu">
        <div className="ima">
          <ul>
            {categories.map((category, index) => (
              <li key={category}>
                <Link to={`/products/${category.toLowerCase()}`}>
                  <img src={`/images/${images[index]}`} alt={category} />
                  <div className="overlay">{category}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
