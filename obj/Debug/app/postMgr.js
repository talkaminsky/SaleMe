var mongoose = require('mongoose');
var domains = require('./domains');
var Post = domains.Post;

var add = function(post) {
   var newPost=  new Post(post);
   newPost.save(function(err, newPost) {
       if (err) return console.error(err);
                console.dir(newPost);
   });

};

var get = function(callback) {
    var result = {};
    Post.find(function(err, posts) {
        callback(posts);
    });
};

var getByID = function(id) {
    
};

var getByUserName = function(userName) {
    
};

var update = function(id,post) {

};


var remove = function(id) {

};


module.exports.add = add;
module.exports.get = get;
