const client = require("./client"); //creates users

async function createUser(name, password, email, is_admin) {
    try {
        const data = await client.query(
            `
    INSERT INTO users(name, password, email, is_admin)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
            [name, password, email, is_admin]
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
      SELECT id, name, password, email, is_admin
      FROM users
      ;
   
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
      SELECT id, name, password, email, is_admin
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
      SELECT id, name, password, email, is_admin
      FROM users
      WHERE id='${number}'
   
    `,
        );

        return data.rows;
    } catch (error) {
        throw error;
    }
}

async function getAdmin(name) {
    try {
        console.log('did we get to getadmin?')
        const data = await client.query(
            `
      SELECT is_admin
      FROM users
      WHERE name='${name}'
   
    `,
        );
        console.log('LOOK FOR THIS LINE')
        const hairball = data.rows
        console.log(hairball)
        const furball = hairball[0]
        console.log(furball)
        console.log(furball.is_admin)
        console.log('boolean is returning')
        return furball.is_admin
    } catch (error) {
        console.log('error finding user, assume user doesnt exist and return false')
        return false
    }
}





module.exports = {
    createUser,
    getAllUsers,
    getUserByName,
    getUserById,
    getAdmin
};