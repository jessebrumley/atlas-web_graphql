// /server/models/project.js

// imports and requirements
const mongoose = require('mongoose');

// Define the Project schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  weight: { type: Number, required: true },
  description: { type: String, required: true },
});

// Create and export the model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
