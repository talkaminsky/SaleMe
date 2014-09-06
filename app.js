
// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var connect = require('connect');
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var FacebookStrategy = require('passport-facebook').Strategy;


// configuration ===========================================
	
// config files
var db = require('./config/db');
var port = 8099; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded


app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.use(new GooglePlusStrategy({
    clientId: '823912941478-rvhn5fcrdfpt6st9cf5jnik0pb03tb5e.apps.googleusercontent.com',
    clientSecret: 'ulkfmYeUDU7OPjMasIxuSUZG'
},
  function (tokens, profile, done) {
    // Create or update user, call done() when complete...
    done(null, profile, tokens); 
}
));


passport.use(new FacebookStrategy({
        clientID: '1494546327459615',
        clientSecret: '255edb6f741403c8c9bd1c12132f2c98',
        callbackURL: '/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		console.log(profile);
        	return done(null, profile);
	});
    }
));



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});

 
// routes ==================================================
require('./app/postsRoutes')(app); // configure our routes
require('./app/usersRoutes')(app); // configure our routes
require('./app/globalRoutes')(app);


//Connect to DB=============================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local'); // connect to our database

// start app ===============================================
app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
