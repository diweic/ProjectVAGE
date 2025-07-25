// db.js
const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

client.connect()
    .then(() => console.log('Connected to DB'))
    .catch(err => console.error('DB connection error', err));

module.exports = client;
