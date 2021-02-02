const router = require("express").Router();
const metalsController = require("../../controllers/metalsController");
const alertsController = require("../../controllers/alertsController");

router.route("/").get(metalsController.index);
router.route("/alerts").get(alertsController.getAlertsPage);

module.exports = router;
