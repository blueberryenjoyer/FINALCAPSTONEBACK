const express = require("express");
const Router = express.Router();
const { getAllUsers } = require("../db/users");

Router.get("/", async (req, res) => { //working, thanks ed

    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;