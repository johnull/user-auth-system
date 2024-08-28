const LocalStrategy = require('passport-local').Strategy;
// user table model
const mysql = require('mysql');
const { conn, db } = require('./db');
const connection = mysql.createConnection(conn);
const bcrypt = require('bcrypt');

connection.query('USE  ' + db.database);

// passport is required for persist login sessions
// serialize and unserialize users out of session