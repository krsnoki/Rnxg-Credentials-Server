const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  branch: {
    type: String, 
    required: true,
  },
  passingYear: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  collegeEmail: {
    type: String,
    required: true,
    unique: true,
  },
  personalEmail: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
