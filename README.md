# mySQL-REST-API for full-stack application

Simple RESTful API for mySQL database. This was the first full-stack application and it was designed with the parameters for CSCI440: Databases at MSU. [The front-end built with ReactJS](https://github.com/TimParrish/frontend-for-database-app) uses the Axios package to make the HTTP requests back to this code using the ExpressJS server, mySQL and some supporting packages. The design lends itself to the project that I was assigned with the given constraints, future full-stack applications I build without the design constraints will look much different.

The dataset used for this full-stack application was the [FBI Crime Statistics for 2015 and 2016](https://ucr.fbi.gov/crime-in-the-u.s/2016/crime-in-the-u.s.-2016/tables/table-2/table-2.xls#overview) with some expanded random data to meet the parameters of the assignment. 

Note: to install and start this API endpoint, a mySQL database with the approprite permissions and user accounts must be configured on the server first. The database credentials can be added to the databaseConnection variable near the top of the app.js file.

From the root directory of this project: `npm install`

Once the project is installed, start the server: `node app.js`

If updates are made to app.js, the server will need to be stopped and then restarted with `node app.js`

To test if the server is up and running (reguardless of if mySQL is hooked in yet), you can navigate to the default route of the web server of `127.0.0.1:443/` where the ip address this is running on is localhost. You should see a message appear in your web browser confirming the server is up and running. `Default route hit, the server is up an running`

This REST API has the following endpoints when linked with an appropiate database:

* `/nationalAggregateTotal/:year`
* `/violent/:crime/:stateName/:dataYear`
* `/non-violent/:crime/:stateName/:dataYear`
* `/violentMaxData/:crime/:year`
* `/violentMinData/:crime/:year`
* `/nonViolentMaxData/:crime/:year`
* `/nonViolentMinData/:crime/:year`
* Default route `/` 

For the given data set:

Violent crimes:
* Murder_manslaughter
* Aggrevated_assult
* Robery
* Rape

Non-violent crimes:
* Burglary
* Larceny_theft
* Motor_vehicle_theft
