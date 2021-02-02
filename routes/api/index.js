const router = require("express").Router();
const userRoutes = require("./userRoutes");
const alertRoutes = require("./alertRoutes");
const metalRoutes = require("./metalRoutes");

router.use("/users", userRoutes);
router.use("/alerts", alertRoutes);
router.use("/metals", metalRoutes);

module.exports = router;