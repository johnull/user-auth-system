var mysql = require('mysql');
var db = require('../config/db');

var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});

conn.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DATABASE_NAME);

conn.query(`CREATE TABLE ${process.env.DATABASE_NAME} . users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  password CHAR(60) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC),
  UNIQUE INDEX username_UNIQUE (username ASC)
)`);

console.log(`
**********************
*  DATABASE CREATED  *
**********************
`);

conn.end(err => {
  if (err) throw err;
  console.log('Connection closed');
});