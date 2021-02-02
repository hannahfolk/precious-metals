const router = require("express").Router();
const metalsController = require("../../controllers/metalsController");

router.route("/").get(metalsController.getMetal);

module.exports = router;
