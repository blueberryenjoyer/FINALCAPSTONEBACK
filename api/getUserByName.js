const express = require("express");
const Router = express.Router();
const { getUserByName } = require("../db/users");

Router.get("/:userName", async (req, res) => {

    try {

        const userData = req.params
        console.log(userData)
        const foundUser = await getUserByName(userData.userName);
        res.send(foundUser);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;