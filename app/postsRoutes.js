var PostMgr = require('./postMgr');
var mongoose = require('mongoose');

module.exports = function(app)
{
    app.get('/api/posts', function(req, res) {
            PostMgr.get(function(data){
                res.send(data);
            });
         });
    
     app.post('/api/posts', function(req, res) 
            {
                var postToSave = req.body.post;

                var postid = mongoose.Types.ObjectId();

                postToSave._id = postid;
                
                PostMgr.add(postToSave);

                res.send('new post saved');
            });
};
