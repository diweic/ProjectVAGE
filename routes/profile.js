// routes/profile.js
const express = require('express');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}` });
});

module.exports = router;
