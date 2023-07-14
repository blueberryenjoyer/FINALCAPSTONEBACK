const express = require("express");
const Router = express.Router();
const { getCatById } = require("../db/cats");

Router.get("/", async (req, res) => {

    try {
        console.log('we got to parcat')
        //const catData = req.params
        // console.log(catData)
        const foundCat = await getCatById(1);
        res.send(foundCat);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;