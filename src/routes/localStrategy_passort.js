var express = require('express');
var app = express();
// var flash=require('connect-flash');

// app.use(flash());
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
const localUser = mongoose.model('localUser');
passport.serializeUser(function(user, done) { 
  done(null, user.id);
});

passport.deserializeUser(function(id, done) { 
    localUser.findById(id, function(err, user) {
    done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done) {
    localUser.findOne({'username':username},function(err,user){
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
     
    });
}));


app.use(passport.initialize());
app.use(passport.session());

app.post('/login',passport.authenticate('local',{successRedirect:'/user', failureRedirect: '/'}),
    function(req,res,next){
      res.json({ id: req.user.id, username: req.user.username });
});

module.exports=app