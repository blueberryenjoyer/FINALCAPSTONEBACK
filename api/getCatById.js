const express = require("express");
const Router = express.Router();
const { getCatById } = require("../db/cats");
const { getUserById } = require("../db/users")

Router.get("/:catId", async (req, res) => {

    try {
        console.log('we got to parcat')
        const catData = req.params
        console.log(catData)
        const foundCat = await getCatById(catData.catId);
        console.log(foundCat)
        //time to change this from a number back to a string, again.



        if (foundCat.length > 0) {
            try { //find a user of this id, and get the name



                let newid = foundCat[0].uploader
                let newFoundCat = foundCat
                const foundUser = await getUserById(newid);
                console.log(foundUser)
                newFoundCat[0].uploader = foundUser[0].name
                console.log(newFoundCat)
                res.send(newFoundCat);
            } catch (error) {
                throw error;
            }
        }
        else { res.send(foundCat) }

    } catch (error) {
        throw error;
    }
});



module.exports = Router;