// /server/app.js

// imports and requirements
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// MongoDB connection string
const db = 'mongodb+srv://jessebrumley:URaJtx8forACf4qj@atlas.da3zi.mongodb.net/?retryWrites=true&w=majority&appName=Atlas'

const app = express();

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log('Error connecting to database:', err);
  });

// Enables GraphiQL UI
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});
