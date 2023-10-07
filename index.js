const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});
// Connect to MongoDB
mongoose.connect('mongodb+srv://rnxg:PrVb6Tqf27OU2DNK@rnxgmembers.2pcnlmt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a user schema and model (Mongoose)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = require('./User');

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { username,
      regNo,
      branch,
      passingYear,
      city,
      collegeEmail,
      personalEmail,
      phone } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ collegeEmail, personalEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password

    // Create a new user
    const newUser = new User({
      username,
      regNo,
      branch,
      passingYear,
      city,
      collegeEmail,
      personalEmail,
      phone
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
