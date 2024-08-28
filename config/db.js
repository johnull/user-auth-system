require('dotenv').config()

var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});
conn.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected to MySQL');

  }
});

module.exports = conn;