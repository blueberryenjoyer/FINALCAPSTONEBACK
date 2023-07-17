const express = require("express");
const Router = express.Router();
const { deleteCatById, getCatById } = require("../db/cats");
const { getUserById } = require("../db/users")
const jwt = require("jsonwebtoken"); //i keep forgetting to import jwt lmao forgetting this import broke my auth 3 times


Router.delete("/", async (req, res) => {

    try {

        const catData = req.body
        console.log(catData)
        console.log('look here')




        try { //check that users are the same
            let frontuser = catData.name
            let backuser = 1

            try {
                let newid = catData.number //should be the cat of the page the frontend is on (143)
                console.log('test1')
                console.log(newid)
                const foundCat = await getCatById(newid); //gets the original cat from the database
                console.log('test2')
                const bonusCat = foundCat[0].uploader
                console.log('test3')
                const foundUser = await getUserById(bonusCat); //looks for a user who has the id mentioned on the cat
                console.log('test4')
                backuser = foundUser[0].name
            } catch (error) {
                console.log('broke in user equivalence here')
                return res.status(401).send(error);
            }

            console.log(frontuser)
            console.log(backuser)
            if (frontuser === backuser) {
                console.log('users are equal, updating')
            } else {
                // Access Denied
                console.log('update broke at user equivalence upper')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('update broke at user equivalence lower')
            return res.status(401).send(error);
        } //end of check users are the same



        const token = req.header("tokenHeaderKey");
        try { //authenticate token
            console.log(catData.name)
            const verified = jwt.verify(token, `secretShrek ${catData.name}`);

            if (verified) {
                console.log('token is good, updating')
            } else {
                // Access Denied
                console.log('update broke at verify')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('update broke at other verify(jwtverify)')
            return res.status(401).send(error);
        }


        const deadCat = await deleteCatById(catData.number);
        res.send(deadCat);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;