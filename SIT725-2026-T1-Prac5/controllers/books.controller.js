'use strict';

const booksService = require('../services/books.service');

const getAllBooks = (req, res) => {
  const data = booksService.getAllBooks();
  res.json({ statusCode: 200, data });
};

const getBookById = (req, res) => {
  const book = booksService.getBookById(req.params.id);
  if (!book) {
    return res.status(404).json({ statusCode: 404, message: 'Book not found' });
  }
  res.json({ statusCode: 200, data: book });
};

module.exports = { getAllBooks, getBookById };
