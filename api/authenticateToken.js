const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");

Router.get("/", (req, res) => {

    try {
        const token = req.header("tokenHeaderKey");

        const verified = jwt.verify(token, 'secretShrek');
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

module.exports = Router;