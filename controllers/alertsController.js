// Dependencies
const db = require("../models");

// Register an alert
const postAlert = (req, res) => {
  // Post the user-created alert to the table "Alerts"
  db.Alert.create(req.body)
    .then(function (dbAlert) {
      res.json(dbAlert);
    })
    .catch(function (err) {
      res.json(err);
    });
};

// Get an alert
const getAlert = (req, res) => {
  // Get all alerts from the table "Alerts" and send them to the client-side
  db.Alert.findAll({}).then((dbAlerts) => {
    res.json(dbAlerts);
  });
};

const getAlertsPage = (req, res) => {
  db.Metal.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  }).then(function (dbMetal) {
    db.Alert.findAll({}).then((dbAlerts) => {
      let dbAlertsArr = [];

      for (var i = 0; i < dbAlerts.length; i++) {
        let currentPrice;

        switch (dbAlerts[i].dataValues.metal) {
          case "gold":
            // Pull out the latest gold price;
            currentPrice = dbMetal[0].dataValues.gold;
            break;
          case "silver":
            // Pull out the latest silver price;
            currentPrice = dbMetal[0].dataValues.silver;
            break;
          case "platinum":
            // Pull out the latest platinum price;
            currentPrice = dbMetal[0].dataValues.platinum;
            break;
          case "palladium":
            // Pull out the latest palladium price;
            currentPrice = dbMetal[0].dataValues.palladium;
            break;
          case "rhodium":
            // Pull out the latest rhodium price;
            currentPrice = dbMetal[0].dataValues.rhodium;
        }
        currentPrice = parseFloat(currentPrice).toFixed(2);
        const price = parseFloat(dbAlerts[i].dataValues.price).toFixed(2);

        const dbAlertsObj = {
          id: dbAlerts[i].dataValues.id,
          client: dbAlerts[i].dataValues.client,
          metal: dbAlerts[i].dataValues.metal,
          price: price,
          currentPrice: currentPrice,
        };

        dbAlertsArr.push(dbAlertsObj);
      }

      res.render("alerts", { alertArr: dbAlertsArr });
    });
  });
};

const updateAlert = (req, res) => {
  db.Alert.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then(function (dbAlert) {
    res.json(dbAlert);
  });
};

// Delete user-chosen alert
const deleteAlert = (req, res) => {
  db.Alert.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function (dbAlert) {
    res.json(dbAlert);
  });
};

module.exports = {
  postAlert,
  getAlert,
  getAlertsPage,
  updateAlert,
  deleteAlert,
};
