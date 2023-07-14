const express = require("express");
const Router = express.Router();
const { updateCatById } = require("../db/cats");

Router.patch("/", async (req, res) => {

    try {
        const catData = req.body
        console.log(catData)
        const regRes = await updateCatById(catData.number, catData.name, catData.description, catData.dangerous)
        res.send(regRes);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;