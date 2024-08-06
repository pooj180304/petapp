const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pet-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  googleId: String,
});

const User = mongoose.model('User', UserSchema);

// Register Route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
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
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, email, username });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in with Google' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
