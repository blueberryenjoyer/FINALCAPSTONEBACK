const express = require('express')
const Router = express.Router()


Router.use("/", require("./health"));
Router.use("/users", require("./users"));
Router.use("/cats", require("./cats"));
Router.use("/reviews", require("./reviews"));
Router.use("/register", require("./register"));
Router.use("/user", require("./getUserByName"));
Router.use("/userid", require("./getUserById"));

//Router.use("/createtoken", require("./createToken")); //deprecated in favor of login
Router.use("/authenticatetoken", require("./authenticateToken"));
Router.use("/login", require("./login"));

module.exports = Router