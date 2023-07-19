const express = require("express");
const Router = express.Router();
const { deleteReviewById, getReviewById } = require("../db/reviews");
const { getUserById } = require("../db/users")
const jwt = require("jsonwebtoken"); //i keep forgetting to import jwt lmao forgetting this import broke my auth 3 times


Router.delete("/", async (req, res) => {

    try {

        const reviewdata = req.body
        console.log(reviewdata)
        console.log('look here for review data')




        try { //check that users are the same
            let frontuser = reviewdata.name
            let backuser = 1

            try {
                let newid = reviewdata.number
                console.log('test1')
                console.log(newid)
                const foundReview = await getReviewById(newid)
                console.log('test2')
                console.log(foundReview)
                const reviewOwner = await foundReview[0].user_id
                console.log('test3')
                const foundUser = await getUserById(reviewOwner)
                console.log('test4')
                backuser = foundUser[0].name
            } catch (error) {
                console.log('broke in user equivalence here')
                return res.status(401).send(error);
            }

            console.log(frontuser)
            console.log(backuser)
            if (frontuser === backuser) {
                console.log('users are equal, updating')
            } else {
                // Access Denied
                console.log('update broke at user equivalence upper')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('update broke at user equivalence lower')
            return res.status(401).send(error);
        } //end of check users are the same



        const token = req.header("tokenHeaderKey");
        try { //authenticate token
            console.log(reviewdata.name)
            const verified = jwt.verify(token, `secretShrek ${reviewdata.name}`);

            if (verified) {
                console.log('token is good, updating')
            } else {
                // Access Denied
                console.log('update broke at verify')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('update broke at other verify(jwtverify)')
            return res.status(401).send(error);
        }


        const deadReview = await deleteReviewById(reviewdata.number);
        res.send(deadReview); //RIP

    } catch (error) {
        throw error;
    }
});



module.exports = Router;