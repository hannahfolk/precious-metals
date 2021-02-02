const router = require("express").Router();
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const usersController = require("../../controllers/usersController");
const metalsController = require("../../controllers/metalsController");
const alertsController = require("../../controllers/alertsController");

router.route("/").get(usersController.login);
router.route("/signup").get(usersController.signup);
router.route("/metals").get(isAuthenticated, metalsController.renderMetals);
router.route("/alerts").get(isAuthenticated, alertsController.getAlertsPage);

module.exports = router;
