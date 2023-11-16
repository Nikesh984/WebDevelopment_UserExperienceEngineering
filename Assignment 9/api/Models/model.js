const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const userModel = mongoose.model('User', userSchema);

const findByUsername = async (email) => {
  return await userModel.findOne({ email });
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (user, inputPassword) => {
  if (!user || !user.password) {
    return false;
  }

  return await bcrypt.compare(inputPassword, user.password);
};

module.exports = { findByUsername, hashPassword, verifyPassword, userModel };
