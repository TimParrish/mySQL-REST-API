const expressInstance = require("express");
const serverApplication = expressInstance();
const mysql = require("mysql");
const cors = require("cors");

serverApplication.use(cors());

serverApplication.get("/", (req, res) => {
  console.log("Hit the root route");
  res.send("Use a more specific route");
});

serverApplication.get("/test", (req, res) => {
  console.log("get test from database");

  const databaseConnection = mysql.createConnection({
    host: "localhost",
    user: "api",
    password: "password",
    database: "timstest",
    insecureAuth: true
  });

  const testQuery = "select * from people";

  databaseConnection.query(testQuery, (err, rows, fields) => {
    console.log("test retrieved???");
    res.json(rows);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }
  });
});

serverApplication.get("/region", (req, res) => {
  console.log("sending the crime data for region!");
  res.send("this will send region data");
});

serverApplication.get("/sub-region", (req, res) => {
  console.log("sending the crime data for sub-region!");
  res.send("this will send sub-region data");
});

serverApplication.get("/state", (req, res) => {
  console.log("sending the crime data for state!");
  res.send("this will send state data");
});

//Server will listen on port 443
serverApplication.listen(443, () => {
  console.log("Server initialized and listening on port 443!!!");
});
