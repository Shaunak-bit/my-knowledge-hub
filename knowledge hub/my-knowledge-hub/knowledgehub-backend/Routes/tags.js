const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');
const authMiddleware = require('./auth'); // Corrected import path for auth middleware

// Get all tags for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const tags = await Tag.find({ userId });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new tag for the authenticated user
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({ message: 'Name and color are required' });
    }

    const newTag = new Tag({ name, color, userId });
    await newTag.save();

    res.status(201).json(newTag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
