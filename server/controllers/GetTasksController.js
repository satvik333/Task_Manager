const Task = require('../Models/Task');

module.exports = {
  getTasks: async (req, res) => {
    try {
      let userId = req.body.userId;
      const tasks = await Task.find({
        userId: userId
      });
      return res.send({
        message: 'Successfully fetched the Tasks',
        tasks
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}