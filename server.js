const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const config = require("dotenv").config();

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true },
  (err, database) => {
    if (err) return console.log(err);

    const myDatabase = database.db(process.env.MONGODB_NAME);

    require("./app/routes")(app, myDatabase);

    app.listen(port, () => {
      console.log("We are Live on " + port);
    });
  }
);
