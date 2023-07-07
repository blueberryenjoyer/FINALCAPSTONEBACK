const express = require("express");
const Router = express.Router();

Router.get("/", async (req, res) => {
    res.send('server is healthy probably!!')
});



module.exports = Router;