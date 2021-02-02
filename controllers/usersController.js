const { User } = require("../models");

// -------------- VIEW ROUTES -------------
const login = (req, res) => {
  if (req.user) {
    res.redirect("/metals");
  }
  res.render("login");
};

const signup = (req, res) => {
  if (req.user) {
    res.redirect("/metals");
  }
  res.render("signup");
};

// -------------- API ROUTES -------------
const apiLogin = (req, res) => {
  res.json(req.user);
};

const apiSignup = (req, res) => {
  const { email, password } = req.body;
  User.create({
    email,
    password,
  })
    .then(() => {
      res.redirect(307, "/api/users/login");
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

const apiLogout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const apiGetUserData = (req, res) => {
  if (!req.user) {
    res.json({});
  } else {
    const { email, id } = req.user;
    res.json({
      email,
      id,
    });
  }
};

module.exports = {
  login,
  signup,
  apiLogin,
  apiSignup,
  apiLogout,
  apiGetUserData,
};
