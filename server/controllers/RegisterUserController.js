const User = require('../Models/User');

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const user = await User.create({
        userName,
        email,
        password
      });
      return res.send({
        message: 'Registration Successful',
        user
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}