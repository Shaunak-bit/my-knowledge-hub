const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

// Get bookmarks by user email
// Get bookmarks by user email
router.get('/', async (req, res) => {
  const { userEmail } = req.query;
  try {
    const bookmarks = await Bookmark.find(userEmail ? { userEmail } : {});
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Add a new bookmark
router.post('/', async (req, res) => {
  const { title, url, description, tags, userEmail } = req.body;
  try {
    const newBookmark = new Bookmark({ title, url, description, tags, userEmail });
    const saved = await newBookmark.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a bookmark
router.delete('/:id', async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
