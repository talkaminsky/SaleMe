var domains = require('./domains');

module.exports = function(app)
{
    
    app.get('/api/users', function(req, res) {

           User.find(function(err, result) {
                        res.send(result);
                      });
    });
    
     app.post('/api/users', function(req, res) 
            {
                var first = req.body.user.firstName;
                var last = req.body.user.lastName;
                var newUser=  new User({firstName: first, lastName: last});
                
                 newUser.save(function(err, newUser) {
                      if (err) return console.error(err);
                      console.dir(newUser);
                    });
                
                res.send('new user save');
            });

};


