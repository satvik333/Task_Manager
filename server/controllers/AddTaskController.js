const Task = require('../Models/Task');

module.exports = {
  createTask: async (req, res) => {
    try {
      const {
        taskTitle,
        taskDescription,
        taskStatus,
        userId,
        userEmail
      } = req.body;
      const task = await Task.create({
        taskTitle,
        taskDescription,
        taskStatus,
        userId,
        userEmail
      });
      return res.send({
        message: 'Successfully Added the Task',
        task
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: 'Internal server error'
      });
    }
  }
}