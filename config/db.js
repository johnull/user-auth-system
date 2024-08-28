require('dotenv').config()

var conn = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
};

// aux to script
var db = {
  database: process.env.DATABASE_NAME,
  table: 'users'
}

module.exports = { conn, db };