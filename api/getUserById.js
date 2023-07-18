const express = require("express");
const Router = express.Router();
const { getUserById } = require("../db/users");

Router.get("/:userId", async (req, res) => {

    try {

        const userData = req.params
        console.log(userData)
        const foundUser = await getUserById(userData.userId);
        res.send(foundUser);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;