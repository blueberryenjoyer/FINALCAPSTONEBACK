const express = require("express");
const Router = express.Router();
const { updateCatById, getCatById } = require("../db/cats");
const { getUserById } = require("../db/users");
const jwt = require("jsonwebtoken");


Router.patch("/", async (req, res) => {

    try {
        const catData = req.body
        console.log(catData)

        try { //check that users are the same
            let frontuser = catData.uploader
            let backuser = 1

            //pseudo because im bad and i forgot what i was doing
            //
            //frontuser is mehmet
            //backuser should be perhaps mehmet, or perhaps developer, or perhaps arcueid
            //to get backuser, simply find him
            //the original cat probably has an uploader

            try { //check that both users are the same

                let newid = catData.id //should be the cat of the page the frontend is on (143)
                const foundCat = await getCatById(newid); //gets the original cat from the database
                const bonusCat = foundCat[0].uploader
                const foundUser = await getUserById(bonusCat); //looks for a user who has the id mentioned on the cat
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
        }


        const token = req.header("tokenHeaderKey");
        try { //authenticate token
            console.log(catData.uploader)
            const verified = jwt.verify(token, `secretShrek ${catData.uploader}`);

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
        const regRes = await updateCatById(catData.id, catData.catname, catData.description, catData.dangerous)
        res.send(regRes);

    } catch (error) {
        console.log('update broke at the bottom verify')
        throw error;
    }
});



module.exports = Router;