/* ----------------------------------------------------
Node.js / Passport

Updated: 05/28/2020
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

// Facebook strategy.
const FacebookTokenStrategyCallback =
(accessToken, refreshToken, profile, done) => done(null, {
  accessToken,
  refreshToken,
  profile,
});

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
}, FacebookTokenStrategyCallback));

// Promisified authenticate functions.
const authFacebook = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('facebook-token', {session: false}, (err, data, info) => {
    if (err) reject(err);
    resolve({data, info});
  })(req, res);
});

module.exports = {authFacebook};
