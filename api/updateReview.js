const express = require("express");
const Router = express.Router();
const { updateReviewById, getReviewById } = require("../db/reviews");
const { getUserByName } = require("../db/users")
const jwt = require("jsonwebtoken");


Router.patch("/", async (req, res) => {

    try {
        const reviewData = req.body
        console.log(reviewData)



        const token = req.header("tokenHeaderKey");
        try { //authenticate token
            console.log(reviewData.uploader)
            const verified = jwt.verify(token, `secretShrek ${reviewData.uploader}`);

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


        try { //check that both users are the same
            let frontuser
            let backuser

            try {

                //we need to get the original review and see who made it




                const foundUser = await getUserByName(reviewData.uploader) //get user's id
                const foundUserId = foundUser[0].id
                console.log(foundUserId)
                frontuser = foundUserId



                const foundReview = await getReviewById(reviewData.id); //get review's userid
                const reviewPoster = foundReview[0].user_id
                console.log(reviewPoster)
                backuser = reviewPoster



            } catch (error) {
                console.log('broke in user equivalence here')
                return res.status(401).send(error);
            }

            console.log(frontuser)
            console.log(backuser)
            if (frontuser === backuser) {
                console.log('users are equal, continuing update')
            } else {
                // Access Denied
                console.log('update broke at user equivalence upper')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('update broke at user equivalence lower')
            return res.status(401).send(error);
        }

        //wierd cases
        let numberedScore = 1
        try {
            numberedScore = Number(reviewData.score)
            console.log(numberedScore)
            console.log(typeof numberedScore)
            console.log(numberedScore == NaN)
            if (isNaN(numberedScore)) {
                console.log('someone sent garbage data as score lololol')
                console.log(numberedScore)
                console.log(typeof numberedScore)
                return res.status(422).send({ "data": "PLEASE USE A NUMBER AS SCORE" });
            }
        } catch (error) {
            return res.status(422).send(error);
        }









        const regRes = await updateReviewById(reviewData.id, reviewData.content, numberedScore)
        res.send(regRes);

    } catch (error) {
        console.log('review update broke at the bottom error')
        throw error;
    }
});



module.exports = Router;