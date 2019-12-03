# mySQL-REST-API

Simple RESTful API for mySQL database

From the root directory of this project
`npm install`

Once the project is installed, start the server:
`node app.js`

If updates are made to app.js, the server will need to be stopped and restarted with
`node app.js`

TODO: create strings that will server as sql queries and take variables from the front end.

select \* from STATES where statename="montana" AND crime = "larceny"
select ? from STATES where statename= ? AND crime = ?

let whatToPick
let stateName
let crimeType
