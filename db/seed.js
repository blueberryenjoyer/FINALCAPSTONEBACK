const client = require("./client");
const { rebuildDB } = require("./seedData");
//technically doesnt seed. just asks seedData to seed.
//call this with 'node seed.js' to build or rebuild the database

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());