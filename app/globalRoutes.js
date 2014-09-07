var passport = require('passport');
var UserMgr = require('./userMgr');

module.exports = function(app) {
    
    app.get('/auth/facebook', passport.authenticate('facebook'));
    
    
    app.get('/home', function(req, res) {
          res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
    
    
    app.post('/auth/google/callback', passport.authenticate('google'), function (req, res) {
        // Return user back to client
        res.send(req.user);
        
        
    });
    
   app.get('/auth/facebook/callback', passport.authenticate('facebook'), function (req, res) {
	   
	   var user = {};
	   UserMgr.getFacebookByID(req.user.id,function(data){
		   user = data;
		   if(user == null)
		   {
			   UserMgr.addFacebook(req.user.id,req.user.displayName,function(data){
				   var addedUser = data;
				   // Return user back to client
				   res.sendfile('./public/views/index.html');
			   });	
		   }
       });
    });
    
    
    // catch 404 and forwarding to error handler
    app.use(function(req, res, next) {
        var err = new Error('404 Not Found Try Again Dudu');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
