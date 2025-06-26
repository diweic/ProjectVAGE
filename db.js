// create a PostgreSQL client using the pg module
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false // Required for Heroku SSL
    }
});

client.connect()
    .then(() => console.log('Connected to Heroku Postgres DB'))
    .catch(err => console.error('Connection error', err));

module.exports = client;