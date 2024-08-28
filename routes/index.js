module.exports = (app, passport, SERVER_SECRET) => {

  // ----- LOGIN -----

  // render login page
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', { failureRedirect: '/login', failureMessage: true }, (err, user, info) => {
      if (err) return next(err);

      // user does not exist
      if (!user) return res.render('login', { message: 'Invalid User or Password' });

      req.login(user, (err) => {
        if (err) return next(err);

        const db = {
          updateOrCreate: (user, cb) => {
            cb(null, user);
          }
        };

        db.updateOrCreate(req.user, (err, user) => {
          if (err) return next(err);

          req.user = {
            id: user.email
          };
        });

        const jwt = require('jsonwebtoken');
        req.token = jwt.sign({
          id: req.user.id,
        }, SERVER_SECRET, {
          expiresIn: 120
        });

        return res.status(200).json({
          user: req.user,
          token: req.token
        });
      });
    })(req, res, next);
  });


  // ----- REGISTER ----

  app.get('/register', (req, res) => {
    res.render('register');
  });

};

