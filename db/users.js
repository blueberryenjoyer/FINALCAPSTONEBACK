const client = require("./client"); //creates users

async function createUser(name, password, email) {
    try {
        const data = await client.query(
            `
    INSERT INTO users(name, password, email)
    VALUES($1, $2, $3)
    RETURNING *
    `,
            [name, password, email]
        );

        return data.rows[0];
    } catch (error) {
        throw error;
    }
}

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

async function getUserByName(name) {
    try {
        const data = await client.query(
            `
      SELECT *
      FROM users
      WHERE name='${name}'
   
    `,
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}

async function getUserById(number) {
    try {
        const data = await client.query(
            `
      SELECT *
      FROM users
      WHERE id='${number}'
   
    `,
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}





module.exports = {
    createUser,
    getAllUsers,
    getUserByName,
    getUserById
};