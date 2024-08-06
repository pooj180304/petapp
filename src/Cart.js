import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    await updateCartOnServer(updatedCart);
  };

  const handleQuantityChange = async (id, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(newQuantity, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    await updateCartOnServer(updatedCart);
  };

  const updateCartOnServer = async (updatedCart) => {
    try {
      await axios.put('http://localhost:5000/cart', updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    console.log('Checking out with items:', cart);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">Happy Paws</div>
        <div className="navbar__search">
          <input type="text" placeholder="Search..." className="navbar__search-input" />
        </div>
        <div>
          <Link to="/cart" className="cart-button">Cart</Link>
        </div>
      </nav>
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <ul className="cart-items">
          {cart.map(item => (
            <li key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
              </div>
              <button onClick={() => handleRemove(item.id)} className="remove-button">Remove</button>
            </li>
          ))}
        </ul>
        <div className="cart-summary">
          <h2>Total: ${calculateTotal().toFixed(2)}</h2>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
