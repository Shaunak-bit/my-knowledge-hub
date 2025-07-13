// models/note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Note', noteSchema);
