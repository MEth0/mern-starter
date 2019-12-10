const config = require('config');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

// Auth middleware, check if user is logged in
function auth(req, res, next) {
  var cookies = new Cookies(req, res, { keys: [config.get('jwtSecret')] })
  var token = cookies.get('JSESSIONID', { signed: true });
  if (!token) {
    res.status(200).json({ connected: false });
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // Add user to payload
    req.user = decoded;
    // Go to next function
    next();
  } catch (e) {
    res.status(400).json({ connected: false, message: 'Token is not valid' });
  }
}

module.exports = auth;
