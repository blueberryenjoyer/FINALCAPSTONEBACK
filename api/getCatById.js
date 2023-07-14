const express = require("express");
const Router = express.Router();
const { getCatById } = require("../db/cats");

Router.get("/", async (req, res) => {

    try {

        const catData = req.body
        console.log(catData)
        const foundCat = await getCatById(catData.number);
        res.send(foundCat);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;