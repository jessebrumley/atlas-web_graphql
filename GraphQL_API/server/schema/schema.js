// /schema/schema.js

// imports and requirements
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');
const _ = require('lodash');
const Task = require('../models/task');
const Project = require('../models/project');

// Define a new GraphQLObjectType: ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Fetch all tasks using MongoDB's built in ID
        return Task.find({ projectId: parent.id });
      },
    },
  }),
});

// Define a new GraphQLObjectType: TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        // Fetch the project using MongoDB's built in ID
        return Project.findById(parent.projectId);
      },
    },
  }),
});

// Mutation Type definition
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add Project Mutation
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        // Create a new Project using the provided arguments
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return project.save();  // Save to MongoDB and return the saved project
      },
    },

    // Add Task Mutation
    addTask: {
      type: TaskType,  // The type of object we are returning
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        projectId: { type: new GraphQLNonNull(GraphQLID) },  // Linking task to a project
      },
      resolve(parent, args) {
        // Create a new Task using the provided arguments and projectId
        const task = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description,
          projectId: args.projectId,
        });
        return task.save();  // Save to MongoDB and return the saved task
      },
    },
  },
});

// Define the Root Query with fields 'task' and 'project'
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find();
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
    },
  },
});

// Export the GraphQLSchema with RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
