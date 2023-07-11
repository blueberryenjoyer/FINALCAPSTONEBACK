const express = require("express");
const Router = express.Router();
const { getUserById } = require("../db/users");

Router.get("/", async (req, res) => {

    try {

        const userData = req.body
        console.log(userData)
        const foundUser = await getUserById(userData.number);
        res.send(foundUser);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;