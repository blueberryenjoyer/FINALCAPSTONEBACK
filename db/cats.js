const client = require("./client"); //creates cats (effectively translates to products)

async function createCat(name, description, dangerous, uploader) {
  try {
    const data = await client.query(
      `
    INSERT INTO cats(name, description, dangerous, uploader)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `,
      [name, description, dangerous, uploader]
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

async function getCatByName(name) {
  try {
    const data = await client.query(
      `
    SELECT *
    FROM cats
    WHERE name='${name}'
 
  `,
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
}

async function getCatById(number) {
  try {
    const data = await client.query(
      `
    SELECT *
    FROM cats
    WHERE id='${number}'
 
  `,
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
}

async function updateCatById(id, name, description, dangerous) {
  try {
    const data = await client.query(
      `

    UPDATE cats
    SET name = '${name}', description= '${description}', dangerous= '${dangerous}'
    WHERE id='${id}';
 
  `,
    );
    return data.rows
    //this actually returns garbage for some reason
  } catch (error) {
    throw error;
  }
}

async function deleteCatById(number) {
  try {
    const data = await client.query(
      `
    DELETE 
    FROM cats
    WHERE id='${number}'
 
  `,
    );

    return data.rows;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  createCat,
  getAllCats,
  getCatByName,
  getCatById,
  updateCatById,
  deleteCatById,
};