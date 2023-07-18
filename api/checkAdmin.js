const express = require("express");
const Router = express.Router();
const { getAdmin } = require("../db/users");

Router.get("/", async (req, res) => {

    const username = req.header("adminName");
    console.log(username)
    console.log('username logged')
    try { //verify admin

        console.log('starting getAdmin db call')
        const isadmin = await getAdmin(username); //this block can be copied around but username must be set outside
        console.log(isadmin) //this should be a true or false every time
        console.log('logging isadmin')
        console.log(isadmin === true)
        console.log('relative')

        res.send(isadmin)



    } catch (error) {
        console.log('something broke, sending 401 and false')
        return res.status(401).send(false);
    }

});

module.exports = Router;