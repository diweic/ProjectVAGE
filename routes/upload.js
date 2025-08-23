// routes/upload.js
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const router = express.Router();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload - accept up to 9 files
router.post('/', upload.array('images', 9), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  try {
    const uploadPromises = req.files.map((file) => {
      const fileExtension = file.originalname.split('.').pop();
      const key = `posts/${uuidv4()}.${fileExtension}`;

    return s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype
    }).promise();
    });

    const results = await Promise.all(uploadPromises);
    const urls = results.map(result => result.Location);
    res.status(200).json({ urls });
  } catch (err) {
    console.error('S3 upload error:', err);
    res.status(500).json({ message: 'Failed to upload image(s)' });
  }
});

module.exports = router;
