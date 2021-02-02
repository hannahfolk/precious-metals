const express = require("express");
const router  = express.Router();

const metals_controller = require("../controllers/metals_controller");

router.get("/", metals_controller.index);

router.get("/api/metals", metals_controller.getMetal);

module.exports = router;