const { Alert, Metal } = require("../models");

// Register an alert
const postAlert = async (req, res) => {
  const { body } = req;
  body.UserId = req.user.id;
  try {
    // Post the user-created alert to the table "Alerts"
    const dbAlert = await Alert.create(body);
    res.status(200).json(dbAlert);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get an alert
const getAlerts = async (req, res) => {
  const { id } = req.user;
  try {
    // Get all alerts from the table "Alerts" and send them to the client-side
    const dbAlerts = await Alert.findAll({
      where: {
        UserId: id,
      },
    });
    res.json(dbAlerts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAlertsPage = async (req, res) => {
  const { id } = req.user;
  try {
    const dbMetal = await Metal.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    });

    const dbAlerts = await Alert.findAll({
      where: {
        UserId: id,
      },
    });

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
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateAlert = async (req, res) => {
  const {
    body: { price },
  } = req;
  const { id } = req.params;
  console.log(id);
  console.log(price);
  try {
    const dbAlert = await Alert.update(
      { price },
      {
        where: { id },
      }
    );
    res.status(200).json(dbAlert);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Delete user-chosen alert
const deleteAlert = async (req, res) => {
  const { id } = req.params;
  try {
    const dbAlert = await Alert.destroy({
      where: {
        id,
      },
    });
    res.status(200).json(dbAlert);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  postAlert,
  getAlerts,
  getAlertsPage,
  updateAlert,
  deleteAlert,
};
