const router = require("express").Router();
const passport = require("../../config/passport");
const usersController = require("../../controllers/usersController");

router.post("/login", passport.authenticate("local"), usersController.apiLogin);
router.post("/signup", usersController.apiSignup);
router.get("/logout", usersController.apiLogout);
router.get("/user-data", usersController.apiGetUserData);

module.exports = router;
