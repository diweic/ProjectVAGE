// server.js
const http = require('http'); // Node.js built-in HTTP module
const fs = require('fs');     // Node.js built-in File System module
const path = require('path'); // Node.js built-in Path module
const client = require('./db'); // Import the PostgreSQL client
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const handleSignup = require('./signupHandler'); // Import the signup handler

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
        return handleSignup(req, res);
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