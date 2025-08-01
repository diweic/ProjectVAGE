// server.js
const express = require('express');
const path = require('path');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const postsRoute = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve React frontend

// API routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/user-profile', profileRoute);
app.use('/api/posts', postsRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const buildPath = path.resolve(__dirname, 'client', 'build', 'index.html');
app.get('*', (req, res) => {
  res.sendFile(buildPath);
});
