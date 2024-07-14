const express = require("express");
const route_login = express.Router();
const path = require("path");

const { signup, login, signout, email } = require("../controllers/login");

route_login.get("/", async (req, res) => {
  res
    .status(200)
    .sendFile(
      path.resolve(__dirname, "..", "index.html")
    );
});

route_login.post("/signup", signup);

route_login.post("/login", login);

route_login.post("/email", email);

route_login.post("/signout", signout);

module.exports.route_login = route_login;
