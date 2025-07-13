// server.js
const express = require('express');
const path = require('path');
const signupRoute = require('./routes/signup');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// API routes
app.use('/api/signup', signupRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
