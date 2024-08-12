// MenuPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenuPage.css';

function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };

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
        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search..." 
            className="navbar__search-input"
          value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
  />
  <button type="submit" className="search-button">Search</button>
</form>
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
