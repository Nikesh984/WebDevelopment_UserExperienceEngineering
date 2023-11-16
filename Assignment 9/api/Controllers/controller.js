const authService = require('../Services/service');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authService.authenticateUser(email, password);

    if (result.error) {
      res.status(401).json({ error: result.error });
    } else {
      // Authenticated user and the token
      const { user, token } = result;
      
      //Handle the authenticated user and token as needed
      res.json({ user, token });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { loginController };
