const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
const QRCode = require('qrcode');
// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});
// Connect to MongoDB
mongoose.connect('mongodb+srv://rnxg:XTgIyrIriaJ41WB9@rnxgmembers.2pcnlmt.mongodb.net/?retryWrites=true&w=majority', {
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
    const {
      username,
      regNo,
      branch,
      passingYear,
      city,
      collegeEmail,
      personalEmail,
      phone,
    } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({
      $or: [{ collegeEmail }, { personalEmail }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password (if you have a password field)

    // Create a new user
    const newUser = new User({
      username,
      regNo,
      branch,
      passingYear,
      city,
      collegeEmail,
      personalEmail,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.get('/generateQR/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Retrieve the data from MongoDB using the ID or any other method
    const document = await User.findById(id);

    if (!document) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Encode the collegeEmail as a QR code
    const qrCodeImage = await QRCode.toDataURL(document.collegeEmail);

    // Send the QR code image as a response
    res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating QR code' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
