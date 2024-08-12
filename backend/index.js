const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import the User model
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
    // Check if the user with the given Google ID or email already exists
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // If user does not exist, create a new one
      user = new User({ googleId, email, username });
      await user.save();
    }

    // Generate JWT token for the user
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

const Product = require('./models/Product');

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

app.get('/search/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    if (products.length === 0) {
      return res.status(200).json({ products: [], totalCount: 0 });
    }

    res.status(200).json({ products, totalCount: products.length });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching search results' });
  }
});



// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
