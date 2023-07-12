const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");

Router.post("/", (req, res) => { //this code is currently deprecated in favor of login
    console.log(req.body)
    let data = {
        name: req.body.name,
        password: req.body.password,
    }
    const token = jwt.sign(data, 'secretShrek');
    res.json(token);
});

module.exports = Router;