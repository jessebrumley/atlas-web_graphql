// /server/models/task.js

// imports and requirements
const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
}); // ObjectId obtains ID number from MongoDB

// Create and export the model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
