const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFilePath = './users.json';
const cartFilePath = './cart.json';

// Register endpoint
app.post('/register', (req, res) => {
  const userData = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }
    const users = data ? JSON.parse(data) : [];
    users.push(userData);

    fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing data file' });
      }
      res.status(200).json({ message: 'User registered successfully' });
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }
    const users = data ? JSON.parse(data) : [];
    const user = users.find(user => user.email === email);

    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Get cart endpoint
app.get('/cart', (req, res) => {
  fs.readFile(cartFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading cart data' });
    }
    const cart = data ? JSON.parse(data) : [];
    res.status(200).json(cart);
  });
});

// Add to cart endpoint
app.post('/cart', (req, res) => {
  const item = req.body;

  fs.readFile(cartFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading cart data' });
    }
    const cart = data ? JSON.parse(data) : [];
    cart.push(item);

    fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing cart data' });
      }
      res.status(200).json({ message: 'Item added to cart' });
    });
  });
});

// Update cart endpoint
app.put('/cart', (req, res) => {
  const updatedCart = req.body;

  fs.writeFile(cartFilePath, JSON.stringify(updatedCart, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing cart data' });
    }
    res.status(200).json({ message: 'Cart updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
