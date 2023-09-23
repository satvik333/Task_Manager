const Task = require('../Models/Task');

module.exports = {
  deleteTask: async (req, res) => {
    try {
      await Task.deleteOne({
        _id: req.body.id
      });
      return res.send({
        message: 'Successfully deleted the task'
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }

}