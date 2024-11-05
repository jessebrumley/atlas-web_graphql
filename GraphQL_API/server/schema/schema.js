// Import required components from graphql
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = require('graphql');

// Define a new GraphQLObjectType: TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
  },
});

// Define the Root Query with a field 'task' that takes an 'id' argument
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString }, // Argument for querying a specific task by id
      },
      resolve(parent, args) {
        // Placeholder function: Replace with database logic in the future
        return {
          id: '1',
          title: 'Sample Task',
          weight: 10,
          description: 'A sample task description.',
        };
      },
    },
  },
});

// Export the GraphQLSchema with RootQuery
module.exports = new GraphQLSchema({
  query: RootQuery,
});
