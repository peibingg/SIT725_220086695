const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to you and 90% how you react to it.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking.",
]
app.get('/api/quote', function(req, res) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json(quotes[randomIndex]);
});

app.get('/square', (req, res) => {
    const num = parseFloat(req.query.num || 0);
   const square = num * num;
    res.send(`The square of ${num} is ${square}`);
});

app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a || 0);
    const b = parseFloat(req.query.b || 0);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
});

app.listen(port, () => {
    console.log('App listening to: ' + port);
});