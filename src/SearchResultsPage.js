// SearchResultsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import { useNavigate } from 'react-router-dom';
function SearchResultsPage() {
    const [searchQuery, setSearchQuery] = useState('');
  const { query } = useParams();
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search/${query}`);
        setProducts(response.data.products);
        setTotalCount(response.data.totalCount);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [query]);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
    }
  };
  const handleAddToCart = async (product) => {
    const cartItem = { ...product, quantity: 1 };

    try {
      await axios.post('http://localhost:5000/cart', cartItem);
      console.log('Item added to cart:', cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  if (!products.length) {
    return (
      <div className="product-page">
        <h1>No products found for "{query}"</h1>
      </div>
    );
  }

  return (
    <div className="product-page">
      <nav className="navbar">
        <div className="navbar__logo">Happy Paws</div>
        <div className="navbar__search">
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
        </div>
        <div>
          <Link to="/cart" className="cart-button">Cart</Link>
        </div>
      </nav>
      <h1>Search Results for "{query}"</h1>
      <p>Displaying {totalCount} products</p>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={`/images/${product.image}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Price: {product.price}</p>
            <p>Available: {product.quantity}</p>
            <button className="buy-now">Buy Now</button>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
