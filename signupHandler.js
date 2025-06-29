// signupHandler.js
const bcrypt = require('bcrypt');
const client = require('./db');

async function handleSignup(req, res) {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
        try {
            const { email, password } = JSON.parse(body);

            // Check if email exists
            const existing = await client.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existing.rows.length > 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Email already exists.' }));
            }

            // Salt and hash the password
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashed = await bcrypt.hash(password, salt);

            await client.query('INSERT INTO user_credentials (email, salt, hash) VALUES ($1, $2, $3)', [email, salt, hashed]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Signup successful!' }));
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Database error. Try again.' }));
        }
    });
}

module.exports = handleSignup;
