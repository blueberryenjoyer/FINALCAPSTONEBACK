const express = require("express");
const Router = express.Router();
const { getUserByName } = require("../db/users");

Router.get("/", async (req, res) => {

    try {

        const userData = req.body
        console.log(userData)
        const foundUser = await getUserByName(userData.name);
        res.send(foundUser);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;