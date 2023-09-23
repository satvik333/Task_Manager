const User = require('../Models/User');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.send({
        message: 'Successfully fetched the Users',
        users
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}