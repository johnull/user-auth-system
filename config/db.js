var mysql = require('mysql');
require('dotenv').config()

var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

conn.connect(err => {
  if (err) {
    console.log(error);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = conn;