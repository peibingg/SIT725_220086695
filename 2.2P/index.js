const express = require('express');

const app = express();
const PORT = 3000;

// Parse incoming JSON request bodies
app.use(express.json());

// ─────────────────────────────────────────────
// GET /add?a=5&b=3  →  { result: 8 }
// ─────────────────────────────────────────────
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).json({ error: 'Both "a" and "b" must be valid numbers.' });
  res.json({ operation: 'add', a, b, result: a + b });
});

// ─────────────────────────────────────────────
// GET /subtract?a=10&b=4  →  { result: 6 }
// ─────────────────────────────────────────────
app.get('/subtract', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).json({ error: 'Both "a" and "b" must be valid numbers.' });
  res.json({ operation: 'subtract', a, b, result: a - b });
});

// ─────────────────────────────────────────────
// GET /multiply?a=6&b=7  →  { result: 42 }
// ─────────────────────────────────────────────
app.get('/multiply', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).json({ error: 'Both "a" and "b" must be valid numbers.' });
  res.json({ operation: 'multiply', a, b, result: a * b });
});

// ─────────────────────────────────────────────
// GET /divide?a=20&b=4  →  { result: 5 }
// ─────────────────────────────────────────────
app.get('/divide', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).json({ error: 'Both "a" and "b" must be valid numbers.' });
  if (b === 0) return res.status(400).json({ error: 'Division by zero is not allowed.' });
  res.json({ operation: 'divide', a, b, result: a / b });
});

// Start server
app.listen(PORT, () => {
  console.log(`Calculator API running at http://localhost:${PORT}`);
});
