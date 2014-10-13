var PostMgr = require('./postMgr');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

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

    app.post('/upload', function(req, res) {
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log('File [' + fieldname +']: filename: ' + filename );

            console.log('Save File..');
            var saveTo = path.join('c:\\Tal', path.basename(filename));
            file.pipe(fs.createWriteStream(saveTo));

        });

        req.busboy.on('field', function(fieldname, value, valTruncated, keyTruncated) {
            console.log('on:field');
        });

        req.busboy.once('end', function() {
            console.log('once:end');
        });

        req.pipe(req.busboy);

        res.send('new post saved');
    });
};
