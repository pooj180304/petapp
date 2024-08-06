import React from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

const productsData = {
    dogs: [
        { name: 'Dog Food', price: '$10', quantity: '20', image: 'dog_food.jpg' },
        { name: 'Dog Toy', price: '$5', quantity: '15', image: 'dog_toy.jpg' },
        { name: 'Dog Leash', price: '$12', quantity: '10', image: 'dog_leash.jpg' },
        { name: 'Dog Bed', price: '$40', quantity: '8', image: 'dog_bed.jpg' },
        { name: 'Dog Shampoo', price: '$7', quantity: '25', image: 'dog_shampoo.jpg' },
        { name: 'Dog Collar', price: '$6', quantity: '30', image: 'dog_collar.jpg' },
      ],
      cats: [
        { name: 'Cat Food', price: '$8', quantity: '30', image: 'cat_food.jpg' },
        { name: 'Cat Toy', price: '$6', quantity: '20', image: 'cat_toy.jpg' },
        { name: 'Cat Litter', price: '$10', quantity: '15', image: 'cat_litter.jpg' },
        { name: 'Cat Bed', price: '$35', quantity: '10', image: 'cat_bed.jpg' },
        { name: 'Cat Scratcher', price: '$25', quantity: '5', image: 'cat_scratcher.jpg' },
        { name: 'Cat Collar', price: '$5', quantity: '40', image: 'cat_collar.jpg' },
      ],
      birds: [
        { name: 'Bird Seed', price: '$7', quantity: '25', image: 'bird_seed.jpg' },
        { name: 'Bird Cage', price: '$30', quantity: '5', image: 'bird_cage.jpg' },
        { name: 'Bird Toy', price: '$4', quantity: '10', image: 'bird_toy.jpg' },
        { name: 'Bird Bath', price: '$15', quantity: '8', image: 'bird_bath.jpg' },
        { name: 'Bird Perch', price: '$10', quantity: '12', image: 'bird_perch.jpg' },
        { name: 'Bird Feeder', price: '$20', quantity: '6', image: 'bird_feeder.jpg' },
      ],
      fish: [
        { name: 'Fish Food', price: '$5', quantity: '50', image: 'fish_food.jpg' },
        { name: 'Fish Tank', price: '$100', quantity: '2', image: 'fish_tank.jpg' },
        { name: 'Fish Net', price: '$3', quantity: '20', image: 'fish_net.jpg' },
        { name: 'Aquarium Filter', price: '$25', quantity: '10', image: 'aquarium_filter.jpg' },
        { name: 'Aquarium Heater', price: '$15', quantity: '8', image: 'aquarium_heater.jpg' },
        { name: 'Aquarium Light', price: '$20', quantity: '12', image: 'aquarium_light.jpg' },
      ],
      reptiles: [
        { name: 'Reptile Food', price: '$10', quantity: '15', image: 'reptile_food.jpg' },
        { name: 'Reptile Tank', price: '$80', quantity: '3', image: 'reptile_tank.jpg' },
        { name: 'Heat Lamp', price: '$25', quantity: '7', image: 'heat_lamp.jpg' },
        { name: 'Reptile Substrate', price: '$15', quantity: '10', image: 'reptile_substrate.jpg' },
        { name: 'Reptile Hide', price: '$20', quantity: '8', image: 'reptile_hide.jpg' },
        { name: 'Reptile Misting System', price: '$50', quantity: '4', image: 'reptile_misting_system.jpg' },
      ],
      small_pets: [
        { name: 'Small Pet Food', price: '$8', quantity: '25', image: 'small_pet_food.jpg' },
        { name: 'Small Pet Cage', price: '$60', quantity: '5', image: 'small_pet_cage.jpg' },
        { name: 'Small Pet Toy', price: '$4', quantity: '30', image: 'small_pet_toy.jpg' },
        { name: 'Small Pet Bedding', price: '$12', quantity: '20', image: 'small_pet_bedding.jpg' },
        { name: 'Small Pet Chew', price: '$3', quantity: '50', image: 'small_pet_chew.jpg' },
        { name: 'Small Pet Hideout', price: '$10', quantity: '10', image: 'small_pet_hideout.jpg' },
      ],
};

function ProductPage() {
  const { category } = useParams();
  const products = productsData[category];

  if (!products) {
    return <div className="product-page"><h1>No products available for this category</h1></div>;
  }

  const handleAddToCart = async (product) => {
    const cartItem = { ...product, quantity: 1 };

    try {
      await axios.post('http://localhost:5000/cart', cartItem);
      console.log('Item added to cart:', cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="product-page">
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


