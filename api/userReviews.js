const express = require("express");
const Router = express.Router();
const { getUserReviews } = require("../db/reviews");

Router.get("/:user", async (req, res) => {

    const username = req.params.user

    try {


        console.log('userreviews logged here')
        console.log(username)
        const userReviews = await getUserReviews(username);
        res.send(userReviews);

    } catch (error) {
        throw error;
    }
});



module.exports = Router;