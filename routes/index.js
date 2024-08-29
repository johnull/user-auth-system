const authMiddleware = require('../middleware/auth');

module.exports = (app, passport, SERVER_SECRET) => {

  // ---------- LOGIN ------------

  // render login page
  app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', (req, res, next) => {
    passport.authenticate('local-login', { failureRedirect: '/login', failureMessage: true }, (err, user, info) => {
      if (err) return next(err);

      // user does not exist
      if (!user) {
        return res.redirect('/login');
      }

      req.login(user, (err) => {
        if (err) return next(err);

        const jwt = require('jsonwebtoken');

        req.token = jwt.sign({
          id: req.user.id,
        }, SERVER_SECRET, {
          expiresIn: 120
        });

        return res.render('homepage', {
          user: req.user,
          token: req.token
        });
      });
    })(req, res, next);
  });

  // ---------------------------------------------------


  // ----- REGISTER -----

  app.get('/register', (req, res) => {
    res.render('register');
  });

  app.get('/register/success', (req, res) => {
    res.json({ message: 'User created' })
  })

  app.get('/register/failure', (req, res) => {
    res.json({ message: 'This user alreay exists' });
  });

  app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/register/success',
    failureRedirect: '/register/failure',
    failureFlash: true
  }));

  // ----------------------------------------------------------

  // ------------- PROTECTED ROUTES --------------------------

  app.get('/api/profile', authMiddleware, (req, res) => {
    res.json(req.user);
  });
};


