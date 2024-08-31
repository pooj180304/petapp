import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductPage.css';

function ProductPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = async (product) => {
    const cartItem = { ...product, quantity: 1};
  
    try {
      await axios.post('http://localhost:5000/cart', cartItem);
      toast.success('Item added to cart successfully!');
    } catch (error) {
      toast.error('Error adding to cart:', error);
    }
  };
  

  if (!products.length) {
    return <div className="product-page"><h1>No products available for this category</h1></div>;
  }

  return (
    <div className="product-page">
      <ToastContainer /> 
      <nav className="navbar">
        <div className="navbar__logo">Happy Paws</div>
        <div className="navbar__search">
          <input type="text" placeholder="Search..." className="navbar__search-input" />
        </div>
        <div>
          <Link to="/cart" className="cart-button">Cart</Link>
        </div>
      </nav>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <div className="product-grid">
        {products.map(product => (
          <div className="product-card" key={product.name}>
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

export default ProductPage;
