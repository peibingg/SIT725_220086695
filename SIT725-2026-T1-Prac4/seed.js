'use strict';

/**
 * seed.js — populates prac4DB with sample book documents.
 * Run once: npm run seed
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/prac4DB');

mongoose.connection.on('connected', async () => {
  console.log('Connected to MongoDB – seeding data…');

  const BookSchema = new mongoose.Schema({
    title:       { type: String, required: true, minlength: 2 },
    image:       { type: String, required: true },
    link:        { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
  });

  const Book = mongoose.model('Book', BookSchema);

  // Clear existing records so seed is idempotent
  await Book.deleteMany({});

  const sampleBooks = [
    {
      title:       'The Imperfections of Memory',
      image:       'images/book.png',
      link:        'About The Imperfections of Memory',
      description: 'Hello There! I just wanted to say HI to you guys. See ya!',
    },
    {
      title:       'The Story Of A Lonely Boy',
      image:       'images/book2.png',
      link:        'About The Story Of A Lonely Boy',
      description: 'The Story Of A Lonely Boy is a book about a lonely boy who is trying to find his place in the world.',
    },
    {
      title:       'Sin Eater',
      image:       'images/book3.png',
      link:        'About Sin Eater',
      description: 'Sin Eater is a book about a boy who is a sin eater and he is trying to save the world from the sins of the people.',
    },
  ];

  await Book.insertMany(sampleBooks);
  console.log(`Seeded ${sampleBooks.length} books into prac4DB.`);

  mongoose.disconnect();
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
