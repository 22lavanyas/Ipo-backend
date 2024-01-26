const mongoose = require('mongoose');

const panDataSchema = new mongoose.Schema({
  name: String,
  panno: String  
});

const userSchema = new mongoose.Schema({
  token: String,
  timestamp: { type: Date, default: Date.now },
  name: String,
  email: { type: String, required: true, unique: true },
  panData: [panDataSchema],
});

module.exports = mongoose.model('User', userSchema);