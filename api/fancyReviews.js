const express = require("express");
const Router = express.Router();
const { fancyGetReviews } = require("../db/reviews");

Router.get("/:reviewedCat", async (req, res) => {

    try {
        console.log('reviewdata here')
        const reviewData = req.params
        console.log(reviewData)
        const allReviews = await fancyGetReviews(reviewData.reviewedCat);
        res.send(allReviews);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;