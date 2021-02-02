const express = require("express");
const router = express.Router();

const alerts_controller = require("../controllers/alerts_controller");

router.post("/api/alerts", alerts_controller.postAlert);

router.get("/api/alerts", alerts_controller.getAlert);

router.get("/alerts", alerts_controller.getAlertsPage);

router.put("/api/alerts/:id", alerts_controller.updateAlert);

router.delete("/api/alerts/:id", alerts_controller.deleteAlert);

module.exports = router;
