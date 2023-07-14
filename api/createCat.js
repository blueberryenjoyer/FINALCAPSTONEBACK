const express = require("express");
const Router = express.Router();
const { createCat } = require("../db/cats");

Router.post("/", async (req, res) => {

    try {
        const catData = req.body
        console.log(catData)
        const regRes = await createCat(catData.name, catData.description, catData.dangerous)
        res.send(regRes);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;