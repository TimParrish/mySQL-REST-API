const expressInstance = require("express");
const serverApplication = expressInstance();
const mysql = require("mysql");
const cors = require("cors");
serverApplication.use(cors());

let portNumber = 443;

const databaseConnection = mysql.createConnection({
  host: "localhost",
  user: "databaseUserName",
  password: "password",
  database: "databaseName",
  insecureAuth: true
});


//get VIOLENT crime data for a given state by year
serverApplication.get("/violent/:crime/:stateName/:dataYear", (req, res) => {
  const stateName = req.params.stateName;
  const dataYear = req.params.dataYear;
  const crime = req.params.crime;

  const selectStateQuery = `SELECT ${crime} FROM STATE INNER JOIN VIOLENT_CRIME ON 
  STATE.State_id = VIOLENT_CRIME.State_id AND STATE.Data_for_year = VIOLENT_CRIME.Data_for_year 
  WHERE State_name = '${stateName}' and STATE.Data_for_year = ${dataYear}`;

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`VIOLENT crime data for ${crime} in ${stateName}:${dataYear} was retrieved`);

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
    const stateName = req.params.stateName;
    const dataYear = req.params.dataYear;
    const crime = req.params.crime;

    const selectStateQuery = `SELECT ${crime} FROM STATE INNER JOIN 
    NON_VIOLENT_CRIME ON STATE.State_id = NON_VIOLENT_CRIME.State_id AND 
    STATE.Data_for_year = NON_VIOLENT_CRIME.Data_for_year WHERE 
    State_name = '${stateName}' and STATE.Data_for_year = ${dataYear}`;

    databaseConnection.query(selectStateQuery, (err, rows, fields) => {
      console.log(`NON-VIOLENT crime data for ${crime} in ${stateName}:${dataYear} was retrieved`);

      if (err) {
        console.log("database error: " + err);
        res.sendStatus(500);
      }

      return res.json(rows);
    });
  }
); //END: get NON-VIOLENT crime data for a given state by year


// See aggregate national totals by year
serverApplication.get("/nationalAggregateTotal/:year", (req, res) => {
  const year = req.params.year;

  const selectStateQuery = `SELECT SUM(burglary) AS Burglary_total,SUM(larceny_theft) 
  AS larceny_theft_total,SUM(motor_vehicle_theft) AS motor_vehicle_theft_total, 
  SUM(murder_manslaughter) AS murder_manslaughter_total,Sum(aggrevated_assult) 
  AS aggrevated_assult_total, sum(robery) AS robery_total,sum(rape) 
  AS rape_total FROM NON_VIOLENT_CRIME INNER JOIN VIOLENT_CRIME ON 
  NON_VIOLENT_CRIME.State_id = VIOLENT_CRIME.State_id where 
  VIOLENT_CRIME.data_for_year = ${year} AND NON_VIOLENT_CRIME.data_for_year = ${year};`

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`Aggregate State data for ${year} was retrieved!`);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
});// End Aggregate State Data


// Get VIOLENT crime MAX data for a given crime in a given year
serverApplication.get("/violentMaxData/:crime/:year", (req, res) => {
  const crime = req.params.crime;
  const year = req.params.year;

  const selectStateQuery = `SELECT State_name FROM STATE INNER JOIN VIOLENT_CRIME ON 
    STATE.State_id = VIOLENT_CRIME.State_id WHERE ${crime} = (SELECT MAX(${crime}) 
    FROM VIOLENT_CRIME) AND STATE.Data_for_year = ${year};`

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`The state with the highest number of ${crime} for the year ${year} was retrieved!`);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MAX data for a given VIOLENT crime in a given year


// Get VIOLENT crime MIN data for a given crime in a given year
serverApplication.get("/violentMinData/:crime/:year", (req, res) => {
  const crime = req.params.crime;
  const year = req.params.year;

  const selectStateQuery = `SELECT State_name FROM STATE INNER JOIN VIOLENT_CRIME ON 
    STATE.State_id = VIOLENT_CRIME.State_id WHERE ${crime} = (SELECT MIN(${crime}) 
    FROM VIOLENT_CRIME) AND STATE.Data_for_year = ${year};`

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`The state with the lowest number of ${crime} for the year ${year} was retrieved!`);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MIN data for a given VIOLENT crime in a given year


// Get non-violent crime MAX data for a given crime in a given year
serverApplication.get("/nonViolentMaxData/:crime/:year", (req, res) => {
  const crime = req.params.crime;
  const year = req.params.year;

  const selectStateQuery = `SELECT State_name FROM STATE INNER JOIN NON_VIOLENT_CRIME ON 
    STATE.State_id = NON_VIOLENT_CRIME.State_id WHERE ${crime} = (SELECT MAX(${crime}) 
    FROM NON_VIOLENT_CRIME) AND STATE.Data_for_year = ${year};`

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`The state with the highest number of ${crime} for the year ${year} was retrieved!`);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MAX data for a given violent crime in a given year


// Get non-violent crime MIN data for a given crime in a given year
serverApplication.get("/nonViolentMinData/:crime/:year", (req, res) => {
  const crime = req.params.crime;
  const year = req.params.year;

  const selectStateQuery = `SELECT State_name FROM STATE INNER JOIN NON_VIOLENT_CRIME ON 
    STATE.State_id = NON_VIOLENT_CRIME.State_id WHERE ${crime} = (SELECT MIN(${crime}) 
    FROM NON_VIOLENT_CRIME) AND STATE.Data_for_year = ${year};`

  databaseConnection.query(selectStateQuery, (err, rows, fields) => {
    console.log(`The state with the lowest number of ${crime} for the year ${year} was retrieved!`);

    if (err) {
      console.log("database error: " + err);
      res.sendStatus(500);
    }

    return res.json(rows);
  });
}); // END: Get MIN data for a given non-violent crime in a given year


// Create a default route with a response for testing
serverApplication.get("/", (req, res) => {
  console.log("Default route, server is up and running!");
  res.send("Default route hit, the server is up an running");
});


// Initialize the server and listen on portNumber
serverApplication.listen(portNumber, () => {
  console.log("Server initialized and listening on port " + portNumber + "!");
});
