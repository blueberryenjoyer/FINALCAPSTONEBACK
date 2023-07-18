const express = require("express");
const Router = express.Router();
const { getAllUsers, getAdmin } = require("../db/users");
const jwt = require("jsonwebtoken"); //once again i forgot to import this


Router.get("/", async (req, res) => { //this is ALL users. should be admin only.




    const token = req.header("tokenHeaderKey");
    const username = req.header("adminName");
    try { //authenticate token
        console.log(username)
        const verified = jwt.verify(token, `secretShrek ${username}`);

        if (verified) {
            console.log('token is good, allusers')
        } else {
            // Access Denied
            console.log('allusers broke at verify')
            return res.status(401).send(error);
        }
    } catch (error) {
        console.log('allusers broke at other verify(jwtverify)')
        return res.status(401).send(error);
    }




    try { //verify admin

        console.log('fetching the db script')
        const isadmin = await getAdmin(username); //this block can be copied around but username must be set outside
        console.log(isadmin)
        console.log(isadmin === false)
        console.log('relative')
        if (!isadmin) {
            console.log(`there is NO admin by the name of ${username}`)
            throw new Error('not admin');
        }
        else {
            console.log(`there is YES admin by the name of ${username}`)
        }
        console.log(isadmin)
    } catch (error) {
        console.log('it broke at the admin somehow USERS')
        return res.status(401).send({ "data": "you are not admin" });
    }

    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;