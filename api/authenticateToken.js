const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");

Router.get("/", (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password,
    }
    console.log(data.password)
    try {
        const token = req.header("tokenHeaderKey");

        const verified = jwt.verify(token, `secretShrek ${data.name} ${data.password}`);
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