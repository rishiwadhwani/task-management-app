const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true } // Either 'admin' or 'non-admin'
});

module.exports = mongoose.model('User', userSchema);
