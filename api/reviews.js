const express = require("express");
const Router = express.Router();
//const { getAllReviews } = require("../db/getData");

Router.get("/", async (req, res) => { //working, thanks ed
    res.send('reviews test response')

    // try {
    //     const allReviews = await getAllReviews();
    //     res.send(allReviews);

    // } catch (error) {
    //     throw error;
    // }
});



module.exports = Router;