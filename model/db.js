// db connection
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

try {
  conn.connect();
  console.log('Connected to MySQL');
} catch (e) {
  console.log('Connection failed' + e);
}

const getUserById = (id, cb) => {
  const query = 'SELECT id, name, email, password FROM users WHERE id = ? ';
  conn.query(query, [id], (err, result) => {
    if (err) return cb(err);

    if (!result) return cb(null, null);

    cb(null, result[0]);
  });
};

module.exports = { getUserById };