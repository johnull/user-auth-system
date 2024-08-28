const LocalStrategy = require('passport-local').Strategy;
// user table model
const mysql = require('mysql');
const { conn, db } = require('./db');
const connection = mysql.createConnection(conn);
const bcrypt = require('bcrypt');

connection.query('USE  ' + db.database);

// passport is required for persist login sessions
// serialize and unserialize users out of session

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    connection.query(`
      SELECT * 
      FROM users 
      WHERE id = ? `, [id],
      (err, rows) => done(err, rows[0])
    );
  });

  // sign up
  passport.use(
    'local-register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        connection.query(`
          SELECT *
          FROM users
          WHERE email = ? 
          `, [email],
          (err, rows) => {
            if (err) {
              return done(err);
            }
            if (rows.length) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken'));
            } else {
              var newUser = {
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
              };

              var insert = `INSERT INTO users ( email, password ) values (?,?)`;

              connection.query(insert, [newUser.email, newUser.password],
                (err, rows) => {
                  newUser.id = rows.insertId;
                  return done(null, newUser);
                }
              );
            }
          }
        );
      })
  );

  // login
  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      (req, email, password, done) => {
        connection.query(`
          SELECT *
          FROM users 
          WHERE email = ?`,
          [email],
          (err, rows) => {
            if (err) {
              return done(err);
            }

            if (!rows.length) {
              return done(null, false, { message: req.flash('loginMessage', 'No user found.') });
            }

            if (!bcrypt.compareSync(password, rows[0].password)) {
              return done(null, false, req.flash('loginMessage', 'Wrong password'));
            }

            return done(null, rows[0]);
          });
      }));
}