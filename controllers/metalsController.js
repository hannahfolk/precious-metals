// Dependencies
const db = require("../models");
const axios = require("axios");

const apiKey = process.env.crippled_APIKey;

// Get the updated prices for the five metals

const postMetal = function() {
  axios
    .get(`http://metals-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=XAU,XAG,XPT,XPD,XRH`)
    .then(function(response) {
      console.log(response.data);
      // Put metals and their prices into an object, picking out only the five metals that the user wants
      const metalsObj = {
        silver: 1/response.data.rates.XAG,
        gold: 1/response.data.rates.XAU,
        palladium: 1/response.data.rates.XPD,
        platinum: 1/response.data.rates.XPT,
        rhodium: 1/response.data.rates.XRH
      };

      // Use db.Metal.create to add each price into the database for each element in the metalsArr
      db.Metal.create(metalsObj)
        .then(function(dbMetal) {
          console.log(dbMetal);
          // res.json(dbMetal);
        })
        .catch(function(err) {
          // res.json(err);
          console.log(err);
        });
    });
};

// postMetal();
setInterval(function() {
  console.log("running a task every 24 hrs");
  postMetal();
}, 86400000);
// }, 60000);
// }, 3600000);
// 24 hours is 86400000 ms
// 1 hour is 3600000 ms
// 1 min is 60000 ms

exports.getMetal = function(req, res) {
  db.Metal.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]]
  }).then(function(dbMetal) {
    // console.log(dbMetal);
    res.json(dbMetal);
  });
};

// Convert the troy ounces to kg and grams
const metalConversions = ounce => {
  return {
    oz: ounce.toFixed(2),
    kg: (ounce / 32.151).toFixed(2),
    grams: (ounce * 31.1).toFixed(2)
  };
};

// Render the daily prices to the page
exports.index = function(req, res) {
  db.Metal.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]]
  }).then(function(dbMetal) {
    if (dbMetal.length === 0) {
      let dbMetalObj = {
        gold: "---",
        silver: "---",
        platinum: "---",
        palladium: "---",
        rhodium: "---"
      };
      
      res.render("index", dbMetalObj);
    } else {
      dbMetalObj = {
        gold: metalConversions(parseFloat(dbMetal[0].dataValues.gold)),
        silver: metalConversions(parseFloat(dbMetal[0].dataValues.silver)),
        platinum: metalConversions(parseFloat(dbMetal[0].dataValues.platinum)),
        palladium: metalConversions(parseFloat(dbMetal[0].dataValues.palladium)),
        rhodium: metalConversions(parseFloat(dbMetal[0].dataValues.rhodium))
      }; 

      res.render("index", dbMetalObj);
    };
  });
};
