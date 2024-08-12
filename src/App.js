// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Services from './Services';
import Contact from './Contact';
import About from './About';
import MenuPage from './MenuPage';
import ProductPage from './ProductPage';
import Cart from './Cart';
import SearchResultsPage from './SearchResultsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/menupage" element={<MenuPage />}/>
        <Route path="/products/:category" element={<ProductPage />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
