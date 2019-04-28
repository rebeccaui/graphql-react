const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://becky:becky@graphql-db-yazse.mongodb.net/test?retryWrites=true");
mongoose.connection.once("open", () => {
    console.log("Connected to database.")
});

// Express-GraphQL Middleware
// graphqlHTTP() fires whenever a request comes to /graphql
// uses schema
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true // This creates graphiql interface at endpoint
}));

// app.get("/", (req, res) => {
//     res.send("Hello world!");
// });

// Start the API server
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  