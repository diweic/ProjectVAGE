// routes/signup.js
const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await client.query('SELECT * FROM user_credentials WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await client.query(
      'INSERT INTO user_credentials (email, salt, hash) VALUES ($1, $2, $3)',
      [email, salt, hash]
    );

    res.json({ message: 'Signup successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Database error. Try again.' });
  }
});

module.exports = router;
