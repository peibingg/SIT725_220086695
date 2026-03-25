# SIT725 – Week 4: Databases

Node.js + Express + MongoDB/Mongoose REST API.  
Student ID: **220086695**

## Project structure

```
SIT725-2026-T1-Prac4/
├── server.js          # Express server + Mongoose connection + REST routes
├── seed.js            # One-time script to populate MongoDB with sample books
├── package.json
└── public/
    ├── index.html     # Materialize UI – renders books fetched from API
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── scripts.js # fetch() calls to /api/books; renders cards
    └── images/        # Place book.png, book2.png, book3.png here
```

## Prerequisites

- Node.js ≥ 18
- MongoDB running locally on port 27017

### Install MongoDB (macOS)

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

## Setup

```bash
cd SIT725-2026-T1-Prac4
npm install
```

## Seed the database

Populate MongoDB with three sample books (run once):

```bash
npm run seed
```

## Run the server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## REST API

| Method | Endpoint         | Description            |
|--------|-----------------|------------------------|
| GET    | `/api/books`    | Return all books       |
| POST   | `/api/books`    | Create a new book      |
| PUT    | `/api/books/:id`| Update a book by ID    |
| DELETE | `/api/books/:id`| Delete a book by ID    |

### Example POST request

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"My Book","image":"images/book.png","link":"About My Book","description":"A great read."}'
```

## Safe writes

POST and PUT routes use allowlisted fields only and pass `runValidators: true`  
to Mongoose so schema constraints (required, minlength, maxlength) are enforced on updates.
