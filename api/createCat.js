const express = require("express");
const Router = express.Router();
const { createCat } = require("../db/cats");
const { getUserByName } = require("../db/users");
const jwt = require("jsonwebtoken");

Router.post("/", async (req, res, next) => {

    try {
        const catData = req.body
        console.log(catData)



        const token = req.header("tokenHeaderKey");
        try { //authenticate
            console.log(catData.uploader)
            const verified = jwt.verify(token, `secretShrek ${catData.uploader}`);
            console.log(catData.uploader)

            if (verified) {
                console.log('is ok token very authy nice cat')
            } else {
                // Access Denied
                console.log('broke at verify')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('broke at other verify')
            return res.status(401).send(error);
        }


        let uploaderId = 1
        try { //get the user's id. to translate the uploaded username to their id.
            const foundUser = await getUserByName(catData.uploader);
            uploaderId = foundUser[0].id
        } catch (error) {
            throw error;
        }


        //fix wierd cases
        try {
            if (catData.name === '') {
                catData.name = 'cat'
            }
            if (catData.description === '') {
                catData.description = 'this is a cat'
            }
        } catch (error) {
            throw error;
        }



        const regRes = await createCat(catData.name, catData.description, catData.dangerous, uploaderId)
        res.send(regRes);



    } catch (error) {
        throw error;
    }
});



module.exports = Router;