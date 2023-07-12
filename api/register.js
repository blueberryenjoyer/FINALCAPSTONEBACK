const express = require("express");
const Router = express.Router();
const { createUser } = require("../db/users");

Router.post("/", async (req, res) => { //register does not automatically log in

    try {
        const userData = req.body
        console.log(userData)
        const regRes = await createUser(userData.name, userData.password, userData.email); //doesnt send admin, intentional. defaults to false.
        res.send(regRes);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;