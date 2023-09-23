const Task = require('../Models/Task');

module.exports = {
  updateTask: async (req, res) => {
    try {
      await Task.findOneAndUpdate({
        _id: req.body._id
      }, req.body);
      return res.send({
        message: 'Successfully updated the Task'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}