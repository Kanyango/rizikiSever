'use strict';

module.exports = function(app , passport)
{

var LocalStrategy    = require('passport-local').Strategy;


    passport.use(new LocalStrategy(
     function(username, password, done) {

        process.nextTick(function(){
          app.db.models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' , status : 401 });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' , status : 401 });
      }
      return done(null, user);
    });
        });
  }
));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
