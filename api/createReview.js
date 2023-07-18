const express = require("express");
const Router = express.Router();
const { createReview, getExistingReviews } = require("../db/reviews");
const { getUserByName } = require("../db/users");
const jwt = require("jsonwebtoken");

Router.post("/", async (req, res) => {

    try {
        const reviewData = req.body
        console.log(reviewData) //receive content, score, uploader, cat_id



        const token = req.header("tokenHeaderKey");
        try { //authenticate
            const verified = jwt.verify(token, `secretShrek ${reviewData.uploader}`);

            if (verified) {
                console.log('is ok token very authy nice review')
            } else {
                // Access Denied
                console.log('broke at verify')
                return res.status(401).send(error);
            }
        } catch (error) {
            console.log('broke at other verify')
            return res.status(401).send(error);
        }


        let user_id = 1
        try { //get the user's id. to translate the uploaded username to their id.
            const foundUser = await getUserByName(reviewData.uploader);
            user_id = foundUser[0].id
            console.log('does the name to id still work? idk')
            console.log(user_id)
        } catch (error) {
            throw error;
        }

        //fix wierd cases

        try { //send the cat and user to the db and see if its already in a review together
            console.log(reviewData.uploader)
            const foundUser = await getExistingReviews(reviewData.cat_id, reviewData.uploader);
            if (foundUser.length == 0) {
                console.log('there is no review match for this cat and user combo')
            }
            else {
                console.log('there is a review match for this cat and user combo')
                throw new Error('cant send duplicate reviews');
            }
            console.log(foundUser)
        } catch (error) {
            console.log('it broke at the user check')
            return res.status(422).send({ "data": "one review per user per cat" });
        }

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






        const regRes = await createReview(reviewData.content, numberedScore, user_id, reviewData.cat_id)
        regRes.data = "it probably worked!"
        res.send(regRes);



    } catch (error) {
        throw error;
    }
});



module.exports = Router;