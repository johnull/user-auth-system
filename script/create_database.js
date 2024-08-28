var mysql = require('mysql');
var { conn, db } = require('../config/db');

var connection = mysql.createConnection(conn);

connection.query('CREATE DATABASE IF NOT EXISTS ' + db.database);

connection.query(`CREATE TABLE ${db.database} . ${db.table} (
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

connection.end(err => {
  if (err) throw err;
  console.log('Connection closed');
});