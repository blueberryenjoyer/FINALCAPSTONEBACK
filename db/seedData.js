const client = require("./client");
const { createUser } = require("./users");
const { createCat } = require("./cats");
const { createReview } = require("./reviews");
const { getAllUsers, getAllCats, getAllReviews } = require("./getData");

//cats? omo
//this is by far the most important, centralizing file. creates the tables.

async function dropTables() {
    try {
        console.log("dropping all the tables")
        await client.query(`
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS cats;
      DROP TABLE IF EXISTS users;
   
   `);

    } catch (error) {
        throw error;
    }
}

async function createTables() {
    try {
        await client.query(`
      CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      is_admin BOOLEAN DEFAULT false

)`);

        await client.query(`
      CREATE TABLE cats (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        dangerous BOOLEAN DEFAULT false

)`);

        await client.query(`
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  score INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id),
  cat_id INTEGER REFERENCES cats(id)

)`);

    } catch (error) {
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log("creating users"); //name password email admin
        await createUser("userlouis", "pwlol", "louis@gmail.com", false);
        await createUser("userwilliam", "pwlol", "william@gmail.com", false);
        await createUser("userfrank", "pwlol", "frank@gmail.com", false);
        await createUser("usermehmet", "kebab", "mehmet@gmail.com", false);

    } catch (error) {
        throw error;
    }
}

async function createInitialCats() {
    try {
        console.log("creating cats");//name description dangerous
        await createCat("tom", "chases jerry", false);
        await createCat("tom with M4A4", "this tom caught jerry, but paid a price", true);
        await createCat("tom at FSA", "having caught jerry, this tom seeks education and employment", false);
        await createCat("neco arc", "a dubious little creature", true);
        await createCat("simba", "i didnt watch the lion king", false);


    } catch (error) {
        throw error;
    }
}

async function createInitialReviews() {
    try {
        console.log("creating reviews");
        //structure is content, score, user_id, cat_id
        //content means the actual review text
        //'my kids watch this' is 10/10, reviewed by user1 which is userlouis, and it reviews review1 which is tom (default tom)
        //note: creates errors. the reference is broken somehow.
        await createReview("ah yes my kids watch this", 7, 1, 1);
        await createReview("why did he shoot jerry with a rifle? that is VERY rude", 0, 3, 2);
        await createReview("i hope tom graduates and lands a well-paying job", 7, 3, 3);
        await createReview("i put her in charge of my mars colony and she annexed the martian kingdom", 10, 5, 4); //10/10, mehmet, neco arc

    } catch (error) {
        throw error;
    }
}



async function rebuildDB() {
    try {
        console.log("rebuilding db pls work this time");
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialCats();
        await createInitialReviews();
        console.log("db is rebuilt (probably)");
        console.log("printing a bunch of getalls")
        await getAllUsers()
        await getAllCats()
        await getAllReviews()
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB,
};