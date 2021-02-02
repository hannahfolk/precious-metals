// Dependencies
const db = require("../models");
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.CRIPPLED_APIKEY;

// Get the updated prices for the five metals
const postMetal = async () => {
  const { data } = await axios.get(
    `http://metals-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=XAU,XAG,XPT,XPD,XRH`
  );
  console.log(data);
  // Put metals and their prices into an object, picking out only the five metals that the user wants
  const metalsObj = {
    silver: 1 / data.rates.XAG,
    gold: 1 / data.rates.XAU,
    palladium: 1 / data.rates.XPD,
    platinum: 1 / data.rates.XPT,
    rhodium: 1 / data.rates.XRH,
  };

  // Use db.Metal.create to add each price into the database for each element in the metalsArr
  db.Metal.create(metalsObj)
    .then((dbMetal) => {
      res.json(dbMetal);
    })
    .catch((err) => {
      // res.json(err);
      console.log(err);
    });
};

const getMetal = (req, res) => {
  db.Metal.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  }).then((dbMetal) => {
    // console.log(dbMetal);
    res.json(dbMetal);
  });
};

// Convert the troy ounces to kg and grams
const metalConversions = (ounce) => {
  return {
    oz: ounce.toFixed(2),
    kg: (ounce / 32.151).toFixed(2),
    grams: (ounce * 31.1).toFixed(2),
  };
};

// Render the daily prices to the page
const renderMetals = async (req, res) => {
  await postMetal();
  db.Metal.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  }).then((dbMetal) => {
    if (dbMetal.length === 0) {
      let dbMetalObj = {
        gold: "---",
        silver: "---",
        platinum: "---",
        palladium: "---",
        rhodium: "---",
      };
      
      res.render("index", dbMetalObj);
    } else {
      dbMetalObj = {
        gold: metalConversions(parseFloat(dbMetal[0].dataValues.gold)),
        silver: metalConversions(parseFloat(dbMetal[0].dataValues.silver)),
        platinum: metalConversions(parseFloat(dbMetal[0].dataValues.platinum)),
        palladium: metalConversions(
          parseFloat(dbMetal[0].dataValues.palladium)
        ),
        rhodium: metalConversions(parseFloat(dbMetal[0].dataValues.rhodium)),
      };

      res.render("index", dbMetalObj);
    }
  });
};

module.exports = {
  getMetal,
  renderMetals,
};
