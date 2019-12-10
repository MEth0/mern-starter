const express = require('express');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth.js');

// User Model
const User = require('../models/User');

const router = express.Router();

// @route POST /api/auth/login
// @desc Sign in a user, set cookie with token
router.post('/login', (req, res) => {

  const { email, password } = req.body;
  if (!email | !password) {
    res.status(400).json({ message: 'Bad request' });
    return;
  }

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ message: 'User Does not exist' });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      jwt.sign({ id: user.id }, config.get('jwtSecret'), { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        var cookies = new Cookies(req, res, { keys: [config.get('jwtSecret')] })
        cookies.set('JSESSIONID', token, { signed: true });
        res.status(200).json({
          message: 'Connected',
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      })
    })
  })

})

// @route POST /api/auth/logout
// @desv Log out a user, remove cookie
router.post('/logout', (req, res) => {

  var cookies = new Cookies(req, res, { keys: [config.get('jwtSecret')] })
  cookies.set('JSESSIONID', { signed: true });
  res.status(200).send({ message: 'Logout successful.' });

})

// @route GET /api/auth/me
// @desc Get info about connected user
// Private route, request pass to auth middleware to check if the user is logged in
router.get('/me', auth, (req, res) => {

  User.findById(req.user.id).select('-password').then(user => {
    res.status(200).json({ connected: true, user });
  });

})

module.exports = router;
