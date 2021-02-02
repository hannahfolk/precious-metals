const axios = require("axios");
const { Metal } = require("../models");
require("dotenv").config();

const apiKey = process.env.CRIPPLED_APIKEY;

const getMetal = async (req, res) => {
  try {
    const dbMetal = await Metal.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(dbMetal);
  } catch (err) {
    res.status(500).json(err);
  }
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
  try {
    // Get the updated prices for the five metals
    const { data } = await axios.get(
      `http://metals-api.com/api/latest?access_key=${apiKey}&base=USD&symbols=XAU,XAG,XPT,XPD,XRH`
    );

    // Put metals and their prices into an object, picking out only the five metals that the user wants
    const metalsObj = {
      silver: 1 / data.rates.XAG,
      gold: 1 / data.rates.XAU,
      palladium: 1 / data.rates.XPD,
      platinum: 1 / data.rates.XPT,
      rhodium: 1 / data.rates.XRH,
    };

    const hbsObj = {
      gold: metalConversions(parseFloat(metalsObj.gold)),
      silver: metalConversions(parseFloat(metalsObj.silver)),
      platinum: metalConversions(parseFloat(metalsObj.platinum)),
      palladium: metalConversions(parseFloat(metalsObj.palladium)),
      rhodium: metalConversions(parseFloat(metalsObj.rhodium)),
    };

    res.status(200).render("index", hbsObj);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getMetal,
  renderMetals,
};
