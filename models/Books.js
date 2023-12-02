const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  comments: { type: Array, default: [] }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;