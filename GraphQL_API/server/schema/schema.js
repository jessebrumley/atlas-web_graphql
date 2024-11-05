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

// Define the Root Query with a single field 'task'
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      resolve(parent, args) {
        // Logic to retrieve data; using example data for testing
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

// Export the GraphQLSchema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
