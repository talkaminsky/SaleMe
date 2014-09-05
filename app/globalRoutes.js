var passport = require('passport');

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
        // Return user back to client
        res.send(req.user);
    });

    app.get('/success', function(req, res){
	   res.send("success logged in");
    });

    app.get('/error', function(req, res){
        res.send("error logged in");
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
