const 
      passport = require('passport'),
      User = require('../models/user'),
      LocalStrategy = require('passport-local').Strategy;

// Create local strategy
const localLogin = new LocalStrategy(
  { usernameField: 'email' } 
  ,(email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err); }
      
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });
  });
});

passport.use(localLogin);
