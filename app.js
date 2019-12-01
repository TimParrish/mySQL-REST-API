const expressInstance = require("express");
const serverApplication = expressInstance();
const mysql = require("mysql");

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
	if (err){
		console.log("database error: " + err);
		res.sendStatus(500);
	};
  });
});

serverApplication.get("/region", (req, res) => {
  console.log("sending the crime data for region!");
  res.send("this will send region data");
});

//Server will listen on port 443
serverApplication.listen(443, () => {
  console.log("Server initialized and listening on port 443!!!");
});
