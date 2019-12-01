const expressInstance = require("express");
const serverApplication = expressInstance();

serverApplication.get("/", (req, res) => {
  console.log("Hit the root route");
  res.send("first working local");
});

serverApplication.get("/states", (req, res) => {
  console.log("sending the crime data for states!");
  res.send("this will send states data");
});

serverApplication.get("/region", (req, res) => {
  console.log("sending the crime data for region!");
  res.send("this will send region data");
});

//Server will listen on port 3027
serverApplication.listen(3027, () => {
  console.log("Server initialized!!!");
});
