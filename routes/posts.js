// routes/posts.js
const express = require('express');
const pool = require('../db'); // ← uses your PostgreSQL pool
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// POST /api/posts - Create a new post with at least one picture (auth required)
router.post('/', authenticateToken, async (req, res) => {
  const { content, imageUrls } = req.body;
  const author_username = req.user.username;

  if (!content || !imageUrls || imageUrls.length === 0) {
    return res.status(400).json({ message: 'Content and at least one image are required.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert the post and get its ID
    const postResult = await client.query(
      'INSERT INTO posts (author_username, content) VALUES ($1, $2) RETURNING id',
      [author_username, content]
    );
    const postId = postResult.rows[0].id;

    // Insert each image
    for (const url of imageUrls) {
      await client.query(
        'INSERT INTO post_images (post_id, image_url) VALUES ($1, $2)',
        [postId, url]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Post created successfully', postId });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error creating post:', err);
    res.status(500).json({ message: 'Error creating post' });
  } finally {
    client.release();
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
