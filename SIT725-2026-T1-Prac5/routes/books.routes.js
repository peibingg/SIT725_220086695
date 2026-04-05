'use strict';

const express = require('express');
const router = express.Router();
const { getAllBooks, getBookById } = require('../controllers/books.controller');

// GET /api/books
router.get('/', getAllBooks);

// GET /api/books/:id
router.get('/:id', getBookById);

module.exports = router;
