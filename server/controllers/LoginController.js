const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../Models/User');

module.exports = {
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          message: 'Please provide both username and password'
        });
      }

      const user = await User.findOne({
        email,
        password
      });

      if (!user) {
        return res.status(401).send({
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign({
        userId: user._id,
        email: user.email
      }, config.jwtSecret, {
        expiresIn: '1h',
      });

      return res.send({
        message: 'LoggedIn Successful',
        user,
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}
