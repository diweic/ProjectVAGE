// routes/login.js
const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const result = await client.query(
      'SELECT * FROM user_credentials WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.hash);

    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Try again.' });
  }
});

module.exports = router;
