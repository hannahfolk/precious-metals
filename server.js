// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");

// server-sent event stream
// app.get('/events', function (req, res) {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
 
//   // send a ping approx every 2 seconds
//   const timer = setInterval(function() {
//     res.write('data: ping\n\n');
 
//     // !!! this is the important part
//     res.flush();
//   }, 2000);
 
//   res.on('close', function() {
//     clearInterval(timer);
//   });
// });

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(path.join(__dirname, "public")));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("dotenv").config();

// Routes
// =============================================================
app.use(require("./routes/alerts.js"));
app.use(require("./routes/metals.js"));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
