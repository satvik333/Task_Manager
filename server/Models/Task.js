const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskTitle: { type: String, required: true },
  taskDescription: { type: String, required: true },
  taskStatus: {
    type: String,
    required: true,
    enum: ["To-Do", "In-Progress", "Completed"]
  },
  userId: { type: Schema.Types.ObjectId, required: true },
  userEmail: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;