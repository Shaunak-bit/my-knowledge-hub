const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);
