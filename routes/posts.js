const express = require('express');
const pool = require('../db'); // ← same db setup you're using
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// GET /api/posts - get all posts
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// POST /api/posts - create post (auth required)
router.post('/', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const author_email = req.user.email;

  if (!content) {
    return res.status(400).json({ message: 'Content required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (author_email, content) VALUES ($1, $2) RETURNING *',
      [author_email, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;
