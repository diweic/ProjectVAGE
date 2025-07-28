// routes/signup.js
const express = require('express');
const bcrypt = require('bcrypt');
const client = require('../db');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username are required.' });
  }

  try {
    // Check for duplicate email or username
    const existing = await client.query(
      'SELECT 1 FROM user_credentials WHERE email = $1 OR username = $2',
      [email, username]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ message: 'Email or username already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Insert new user
    await client.query(
      `INSERT INTO user_credentials (email, username, password_hash, salt)
       VALUES ($1, $2, $3, $4)`,
      [email, username, hash, salt]
    );

    res.status(201).json({ message: 'Signup successful. You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Try again.' });
  }
});

module.exports = router;
