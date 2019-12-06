const expressInstance = require("express");
const serverApplication = expressInstance();
const mysql = require("mysql");
const cors = require("cors");
serverApplication.use(cors());

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "parrish",
  password: "password121419",
  database: "parrish",
  insecureAuth: true
});

//get VIOLENT crime data for a given state by year
serverApplication.get("/violent/:crime/:stateName/:dataYear", (req, res) => {
  console.log("get state test from database");

  const stateName = req.params.stateName;
  const dataYear = req.params.dataYear;
  const crime = req.params.crime;
  //const selectStateQuery = "select * from STATE where State_name = ? and Data_for_year = ? and  crime = ?";
  const selectStateQuery = `SELECT ${crime} FROM STATE INNER JOIN VIOLENT_CRIME ON STATE.State_id = VIOLENT_CRIME.State_id AND STATE.Data_for_year = VIOLENT_CRIME.Data_for_year WHERE State_name = '${stateName}' and STATE.Data_for_year = ${dataYear}`;

  console.log("\n\n" + selectStateQuery + "\n\n");

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log("State data was retrieved!!!");

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); //END: get VIOLENT crime data for a given state by year

//get NON-VIOLENT crime data for a given state by year
serverApplication.get(
  "/non-violent/:crime/:stateName/:dataYear",
  (req, res) => {
    console.log("get state test from database");

    const stateName = req.params.stateName;
    const dataYear = req.params.dataYear;
    const crime = req.params.crime;

    const selectStateQuery = `SELECT ${crime} FROM STATE INNER JOIN NON_VIOLENT_CRIME ON STATE.State_id = NON_VIOLENT_CRIME.State_id AND STATE.Data_for_year = NON_VIOLENT_CRIME.Data_for_year WHERE State_name = '${stateName}' and STATE.Data_for_year = ${dataYear}`;

    console.log("\n" + selectStateQuery + "\n");

    databaseConnection.query(selectStateQuery, (err, rows, fields) => {
      console.log("State data was retrieved!!!");

      if (err) {
        console.log("database error: " + err);
        res.sendStatus(500);
      }

      return res.json(rows);
    });
  }
); //END: get NON-VIOLENT crime data for a given state by year

// Get MAX data for a given crime in a given year
serverApplication.get("/maxData/:crime/:year", (req, res) => {
  console.log("Get state with most roberies");

  const crime = req.params.crime;
  const year = req.params.year;

  const selectState2Query = `SELECT State_name FROM STATE WHERE State_id = (SELECT State_id FROM VIOLENT_CRIME WHERE '${crime}' = (SELECT MAX('${crime}') FROM VIOLENT_CRIME WHERE Data_for_year = ${year})  AND Data_for_year = ${year} LIMIT 1)`;

  console.log("\n\n" + selectState2Query + "\n\n");

  databaseConnection.query(selectState2Query, (err, rows, fields) => {
    console.log("State2 data was retrieved!");

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MAX data for a given crime in a given year

// Get MIN data for a given crime in a given year
serverApplication.get("/minData/:crime/:year", (req, res) => {
  console.log("Get state with fewest roberies");

  const crime = req.params.crime;
  const year = req.params.year;

  const selectState2Query = `SELECT State_name FROM STATE WHERE State_id = (SELECT State_id FROM VIOLENT_CRIME WHERE '${crime}' = (SELECT MIN('${crime}') FROM VIOLENT_CRIME) AND Data_for_year = ${year})  LIMIT 1)`;

  console.log("\n\n" + selectState2Query + "\n\n");

  databaseConnection.query(selectState2Query, (err, rows, fields) => {
    console.log("State2 data was retrieved!");

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MIN data for a given crime in a given year

// See aggregate national totals by year
serverApplication.get("/nationalAggregateTotal/:year", (req, res) => {
  console.log("sending the aggregate national crime totals!");

  //TODO: remove next line after query written
  res.send("this will send aggregate national data");

  //const dataYear = req.params.year;

  //TODO: MAKE A VALID QUERY TO SHOW ALL TOTALS NATIONALY AND RETURN DATA
  // const selectStateQuery =
  //   "select * from STATE where State_name = ? and Data_for_year = ?";

  // databaseConnection.query(
  //   selectStateQuery,
  //   [stateName, dataYear],
  //   (err, rows, fields) => {
  //     console.log("State data was retrieved!!!");
  //     res.json(rows);

  //     if (err) {
  //       console.log("database error: " + err);
  //       res.sendStatus(500);
  //     }
  //   }
  // );
}); // END: See aggregate national totals by year

serverApplication.get("/sub-region", (req, res) => {
  console.log("sending the crime data for sub-region!");
  res.send("this will send sub-region data");
});

// serverApplication.get("/violent/:crime/:stateName/:dataYear", (req, res) => {
//   console.log("sending the violent crime data for state!");

//   const state = req.params.stateName;
//   const crime = req.params.crime;
//   const year = req.params.dataYear;

//   const violentCrimeQuery = `select ${crime} FROM VIOLENT_CRIME WHERE State_id = ( Select State_id from STATE WHERE State_name = '${state}' and Data_for_year = ${year}) and Data_for_year = ${year}`;

//   console.log("\n\n" + violentCrimeQuery + "\n\n");

//   //const violentCrimeQuery = "select Murder_manslaughter FROM VIOLENT_CRIME WHERE State_id = ( Select State_id from STATE where State_name = 'Montana' and Data_for_year = 2016) and Data_for_year = 2016";

//   //databaseConnection.query(violentCrimeQuery, [crime, state, year, year], (err, rows, fields) => {
//   databaseConnection.query(violentCrimeQuery, (err, rows, fields) => {
//     console.log("Violent crime data for a given state and year was retrieved!!!");
//     res.json(rows);

//     if (err) {
//       console.log("database error: " + err);
//       res.sendStatus(500);
//     }
//   });
// });

//Server will listen on port 8080
serverApplication.listen(8080, () => {
  console.log("Server initialized and listening on port 8080!!!");
});
