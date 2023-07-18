const client = require("./client"); //creates reviews

async function createReview(content, score, user_id, cat_id) {
    try {
        const data = await client.query(
            `
    INSERT INTO reviews(content, score, user_id, cat_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
            [content, score, user_id, cat_id]
        );

        return data.rows[0];
    } catch (error) {
        throw error;
    }
}

async function getAllReviews() {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM reviews;
      `
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}

async function fancyGetReviews(id) { //its working!! its working!!
    try {
        const data = await client.query(
            `
            select reviews.id, reviews.content, reviews.score, users.name, cats.catname
            from reviews
            inner join users on reviews.user_id=users.id
            inner join cats on reviews.cat_id=cats.id
            where reviews.cat_id = ${id}
            ;
      `
        );
        console.log(data.rows)
        console.log('this is the review page')

        return data.rows;
    } catch (error) {
        throw error;
    }
}







module.exports = {
    createReview,
    getAllReviews,
    fancyGetReviews
};