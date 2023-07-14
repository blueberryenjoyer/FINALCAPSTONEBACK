const express = require("express");
const Router = express.Router();
const { deleteCatById } = require("../db/cats");

Router.delete("/", async (req, res) => {

    try {

        const catData = req.body
        console.log(catData)
        const deadCat = await deleteCatById(catData.number);
        res.send(deadCat);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;