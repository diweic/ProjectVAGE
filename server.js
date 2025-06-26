// server.js
const http = require('http'); // Node.js built-in HTTP module
const fs = require('fs');     // Node.js built-in File System module
const path = require('path'); // Node.js built-in Path module
const client = require('./db'); // Import the PostgreSQL client
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


const PORT = process.env.PORT || 3000; // Heroku assigns a port via process.env.PORT


// Create an HTTP server    
const server = http.createServer((req, res) => {
    // Log the request URL
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url); 

    // Safety net, appends .html only if there’s no extension at all
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    // Set content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Handle API routes for signup
    if (req.method === 'POST' && req.url === '/api/signup') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            const { email, password } = JSON.parse(body);

            // Check if email already exists
            const existing = await client.query('SELECT * FROM user_credentials WHERE email = $1', [email]);
            if (existing.rows.length > 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Email already exists.' }));
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashed = await bcrypt.hash(password, salt);

            try {
                await client.query('INSERT INTO user_credentials (email, salt, hash) VALUES ($1, $2, $3)', [email, salt, hashed]);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Signup successful!' }));
            } catch (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Database error. Try again.' }));
            }
        });
        return;
    }

    // Read the HTML file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        // Set the content type to HTML and send the file content
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});