const client = require("./client"); //creates cats (effectively translates to products)

async function createCat(name, description, dangerous) {
  try {
    const data = await client.query(
      `
    INSERT INTO cats(name, description, dangerous)
    VALUES($1, $2, $3)
    RETURNING *
    `,
      [name, description, dangerous]
    );

    return data.rows[0];
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


module.exports = {
  createCat,
  getAllCats
};