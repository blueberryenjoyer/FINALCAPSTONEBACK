const express = require("express");
const Router = express.Router();
//const { getAllUsers } = require("../db/getData");

Router.get("/users", async (req, res) => { //not currently even being called by api/users correctly
    res.send('users test response')

    // try {
    //const allUsers = await getAllUsers();
    //res.send(allUsers);

    // } catch (error) {
    //     throw error;
    // }
});



module.exports = Router;