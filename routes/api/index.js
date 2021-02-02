const router = require("express").Router();
const alertRoutes = require("./alertRoutes");
const metalRoutes = require("./metalRoutes");

router.use("/alerts", alertRoutes);
router.use("/metals", metalRoutes);

module.exports = router;