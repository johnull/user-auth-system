const express = require('express');
const path = require('path');
const passport = require('passport');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
var flash = require('connect-flash');
require('ejs');
require('dotenv').config();
require('./config/passport')(passport);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const SERVER_SECRET = 's3cr37';

app.get('/', (req, res) => {
  res.redirect('login');
});

require('./routes/index.js')(app, passport, SERVER_SECRET);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err, 'Error when running server');
  }
  console.log('Server running on port ', process.env.PORT);
});