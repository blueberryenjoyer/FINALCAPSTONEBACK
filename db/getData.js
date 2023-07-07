const client = require("./client");

//this is all in a seperate file because i dont want to look at it in the main creation files

async function getAllUsers() {
    try {
        const data = await client.query(
            `
      SELECT *
      FROM users;
   
    `
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}



async function getAllCats() {
    try {
        const data = await client.query(
            `
        SELECT *
        FROM cats;
      `
        );

        return data.rows;
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
    getAllUsers,
    getAllCats,
    getAllReviews,
};