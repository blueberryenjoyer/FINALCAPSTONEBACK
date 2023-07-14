const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const { getUserByName } = require("../db/users");

Router.post("/", async (req, res) => { //this massive ridiculous code block checks to see if the username and password match the database then creates a token
    console.log(req.body)
    const data = {
        name: req.body.name,
        password: req.body.password,
    }
    const dbData = await getUserByName(data.name);
    if (dbData[0]) { //this code took a long time to make, very goofy process
        const dbName = dbData[0].name
        const dbPassword = dbData[0].password
        if (dbName == data.name) {
            if (dbPassword == data.password) {
                const token = jwt.sign(data, 'secretShrek');
                res.json(token);
            }
            else {
                res.send("error wrong password")
            }
        }
        else {
            res.send("error username is completely broken, this message shouldnt appear ever")
        }
    }
    else {
        res.send("error username is wrong")
    }


});

module.exports = Router;