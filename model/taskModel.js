const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Removes whitespace from the beginning and end of the title
  },
  description: {
    type: String,
    required: true,
    trim: true // Removes whitespace from the beginning and end of the description
  },
  creationDate: {
    type: Date,
    default: Date.now // Defaults to the current timestamp if not provided
  },
  status: {
    type: String,
    enum: ['pending', 'completed'], // Ensures the status is either 'pending' or 'completed'
    default: 'pending' // Defaults to 'pending' if not provided
  }
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports ={TaskModel};
