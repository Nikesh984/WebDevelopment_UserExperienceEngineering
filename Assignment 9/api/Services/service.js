const userModel = require('../Models/model');
const bcrypt = require('bcrypt');


const authenticateUser = async (email, password) => {

  try {
    const user = await userModel.findByUsername(email);

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { error: 'Invalid credentials' };
    }

    const token = generateAuthToken(user);
    return { user, token };
  } catch (error) {
    console.error('Error during login:', error);
    return { error: 'Internal server error' };
  }

};

const generateAuthToken = (user) => {
  // Logic to generate and return an authentication token
};

module.exports = { authenticateUser };
