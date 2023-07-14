const client = require("./client");
const { createUser, getAllUsers } = require("./users");
const { createCat, getAllCats } = require("./cats");
const { createReview, getAllReviews } = require("./reviews");

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
      name VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      is_admin BOOLEAN DEFAULT false

)`);

        await client.query(`
      CREATE TABLE cats (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        dangerous BOOLEAN DEFAULT false,
        uploader INTEGER REFERENCES users(id)

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
        await createUser("developer", "dev", "dev@gmail.com", true);
        await createUser("william", "pwlol", "william@gmail.com", false);
        await createUser("frank", "pwlol", "frank@gmail.com", false);
        await createUser("mehmet", "kebab", "mehmet@gmail.com", false);

    } catch (error) {
        throw error;
    }
}

async function createInitialCats() {
    try {
        console.log("creating cats");//name description dangerous uploader
        await createCat("tom", "chases jerry", false, 1);
        await createCat("tom with M4A4", "this tom caught jerry, but paid a price", true, 1);
        await createCat("tom at FSA", "having caught jerry, this tom seeks education and employment", false, 1);
        await createCat("neco arc", "a dubious little creature", true, 1);
        await createCat("simba", "i didnt watch the lion king", false, 1);


    } catch (error) {
        throw error;
    }
}

async function createInitialReviews() {
    try {
        console.log("creating reviews");
        //structure is content, score, user_id, cat_id
        await createReview("ah yes my kids watch this", 7, 1, 1);
        await createReview("why did he shoot jerry with a rifle? that is VERY rude", 0, 3, 2);
        await createReview("i hope tom graduates and lands a well-paying job", 7, 3, 3);
        await createReview("i put her in charge of my mars colony and she annexed the martian kingdom", 10, 4, 4); //10/10, user4 aka mehmet, cat4 aka neco arc

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