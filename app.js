// imports
require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./db/connection");
const mongoose = require("mongoose");

// vars
const app = express();
const port = process.env.PORT || 5500;

// db
mongoose.set("strictQuery", false);
mongoose.connection.once("open", () => {
  console.log(`db is connected`);
});

// middleware
app.use(`/graphql`, graphqlHTTP({ schema, graphiql: true }));

// start
async function start() {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`server is on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
