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

module.exports = {
    createReview,
    getAllReviews
};