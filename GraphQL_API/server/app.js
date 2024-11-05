const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema.js'); // Import the schema

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema, // Pass the schema here
    graphiql: true, // Enables GraphQL UI
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
