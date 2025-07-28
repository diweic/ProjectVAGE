// routes/posts.js
const express = require('express');
const pool = require('../db'); // ← uses your PostgreSQL pool
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST /api/posts - Create a new post (auth required)
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const author_username = req.user.username;

  if (!content) {
    return res.status(400).json({ message: 'Content is required.' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (author_username, content) VALUES ($1, $2) RETURNING *',
      [author_username, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

// GET /api/posts - Retrieve all posts (public)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

module.exports = router;
