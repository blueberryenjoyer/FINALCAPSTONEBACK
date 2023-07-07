const { Client } = require('pg') //pg = postgresql
//this file just makes the client import work

const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/cats'; //its just 5432 because of psql

const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

module.exports = client;