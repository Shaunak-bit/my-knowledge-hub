// routes/notes.js

const express = require('express');
const router = express.Router();
const Note = require('../models/note');

// GET all notes for a user
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const notes = await Note.find({ userEmail: email });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const { title, content, tags, userEmail } = req.body;
  try {
    const newNote = new Note({ title, content, tags, userEmail });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a note
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
