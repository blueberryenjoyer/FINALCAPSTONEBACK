const express = require('express')
const Router = express.Router()


Router.use("/", require("./health"));

Router.use("/users", require("./users"));
Router.use("/user", require("./getUserByName"));
Router.use("/userid", require("./getUserById"));

Router.use("/reviews", require("./reviews"));
Router.use("/fancyreviews", require("./fancyReviews"));
Router.use("/createreview", require("./createReview"));

Router.use("/register", require("./register"));
Router.use("/login", require("./login"));
Router.use("/authenticatetoken", require("./authenticateToken"));


Router.use("/cats", require("./cats"));
Router.use("/cat", require("./getCatById"));
Router.use("/createcat", require("./createCat"));
Router.use("/updatecat", require("./updateCat"));
Router.use("/deletecat", require("./deleteCat"));

module.exports = Router