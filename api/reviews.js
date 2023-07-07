const express = require('express')
const reviewsRouter = express.Router()
const { getAllReviews } = require("../db/getData");

reviewsRouter.get("/reviews", async (req, res) => {
    try {
        const allReviews = await getAllReviews();

        if (allReviews && allReviews.length) {
            allReviews.forEach((e) => {
                delete e.password;
            });
            res.send(allReviews);
        } else {
            res.send("api received an empty array thats bad");
        }
        //this is just the password deleting script from the code resource
    } catch (error) {
        throw error;
    }
});



module.exports = reviewsRouter