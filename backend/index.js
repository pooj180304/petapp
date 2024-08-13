const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import the User model
const Product = require('./models/Product'); // Import the Product model
const Cart = require('./models/Cart'); // Import the Cart model (we will define this below)
require('dotenv').config(); 
const app = express();
const PORT = 5000;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pet-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User registration route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Google Register/Login Route
app.post('/google-login', async (req, res) => {
  const { googleId, email, username } = req.body;

  try {
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      user = new User({ googleId, email, username });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in with Google' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Route to get products by category
app.get('/products/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Route to add a product to the cart
app.post('/cart', async (req, res) => {
  const { name, price, quantity, image } = req.body;

  try {
    let existingItem = await Cart.findOne({ name });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const newCartItem = new Cart({
        name,
        price,
        quantity,
        image
      });
      await newCartItem.save();
    }

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error.message); // Log the error to the console
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

// Route to get cart items
app.get('/cart', async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

// Route to delete a cart item
app.delete('/cart/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

// Route to update cart items (if needed)
app.put('/cart', async (req, res) => {
  const cartItems = req.body;

  try {
    for (let item of cartItems) {
      await Cart.findByIdAndUpdate(item._id, item);
    }
    res.status(200).json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating cart' });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
