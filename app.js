const express = require('express');
const path = require('path');
require('ejs');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('homepage', {});
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err, 'Error when running server');
  }
  console.log('Server running on port ', process.env.PORT);
});