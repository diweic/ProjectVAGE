// server.js
const express = require('express');
const path = require('path');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve React frontend

// API routes
app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/user-profile', profileRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});