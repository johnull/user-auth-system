const jwt = require('jsonwebtoken');
const { getUserById } = require('../model/db');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token' });
  }

  jwt.verify(token, process.env.SERVER_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Opss.. something went wrong' });
    }

    getUserById(decoded.id, (err, user) => {
      req.user = user;
      next();
    });
  });
};