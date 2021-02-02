const router = require("express").Router();
const alertsController = require("../../controllers/alertsController");

router
  .route("/")
  .get(alertsController.getAlert)
  .post(alertsController.postAlert);

router
  .route("/:id")
  .put(alertsController.updateAlert)
  .delete(alertsController.deleteAlert);

module.exports = router;