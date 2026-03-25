'use strict';

const express  = require('express');
const mongoose = require('mongoose');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── MongoDB connection ────────────────────────────────────────────────────────
mongoose.connect('mongodb://localhost:27017/prac4DB');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB at prac4DB');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
});

// ── Mongoose schema & model ───────────────────────────────────────────────────
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

const Book = mongoose.model('Book', BookSchema);

// ── REST API routes ───────────────────────────────────────────────────────────

// GET all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({ statusCode: 200, data: books, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

// POST a new book (safe write — allowlist fields + schema validation)
app.post('/api/books', async (req, res) => {
  try {
    const { title, image, link, description } = req.body;
    const book = new Book({ title, image, link, description });
    await book.save();
    res.status(201).json({ statusCode: 201, data: book, message: 'Book created successfully' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
});

// PUT update a book by id (safe write with runValidators)
app.put('/api/books/:id', async (req, res) => {
  try {
    const { title, image, link, description } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, image, link, description } },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ statusCode: 404, message: 'Book not found' });
    res.json({ statusCode: 200, data: book, message: 'Book updated successfully' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
});

// DELETE a book by id
app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ statusCode: 404, message: 'Book not found' });
    res.json({ statusCode: 200, message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop.');
});
