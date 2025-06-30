const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: String,
  subject: String,
  message: String,
  datetime: Date,
  sender: String,
  senderRefreshToken: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Email', emailSchema);
