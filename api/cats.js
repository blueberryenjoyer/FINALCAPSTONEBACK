const express = require("express");
const Router = express.Router();
//const { getAllCats } = require("../db/getData");

Router.get("/", async (req, res) => { //working, thanks ed
    res.send('cats test response')

    // try {
    //     const allCats = await getAllCats();
    //     res.send(allCats);

    // } catch (error) {
    //     throw error;
    // }
});



module.exports = Router;