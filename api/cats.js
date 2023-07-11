const express = require("express");
const Router = express.Router();
const { getAllCats } = require("../db/cats");

Router.get("/", async (req, res) => { //working, thanks ed

    try {
        const allCats = await getAllCats();
        res.send(allCats);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;