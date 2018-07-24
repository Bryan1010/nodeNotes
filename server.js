const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  db.url,
  { useNewUrlParser: true },
  (err, database) => {
    if (err) return console.log(err);

    const myDatabase = database.db("node-api");

    require("./app/routes")(app, myDatabase);

    app.listen(port, () => {
      console.log("We are Live on " + port);
    });
  }
);
