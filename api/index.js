const express = require('express')
const Router = express.Router()


Router.use("/", require("./health"));
Router.use("/users", require("./users"));
Router.use("/cats", require("./cats"));
Router.use("/reviews", require("./reviews"));
Router.use("/register", require("./register"));
Router.use("/user", require("./getUserByName"));




module.exports = Router