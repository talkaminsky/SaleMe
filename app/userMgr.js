var mongoose = require('mongoose');
var domains = require('./domains');
var User = domains.User;


var addLocal = function(email,name,password) {
	   var userToSave = { 
			   name: name,
			   password: password,
			   email : email,
	   };
	   var newUsert=  new User(userToSave);
	   newUsert.save(function(err, newUsert) {
	       if (err) return console.error(err);
	                console.dir(newUsert);
	   });
	};
	
var addFacebook = function(id,name,callback) {
		   var userToSave = { 
				   facebook : {
					   name: name,
					   id: id
				   } 
		   };
		   var newUsert=  new User(userToSave);
		   newUsert.save(function(err, newUsert) {
		       if (err) return console.error(err);
		       callback(newUsert);
		   });
		};
		
var addGoogle = function(email,name,password) {
			   var userToSave = { 
					   name: name,
					   password: password,
					   email : email,
			   };
			   var newUsert=  new User(userToSave);
			   newUsert.save(function(err, newUsert) {
			       if (err) return console.error(err);
			                console.dir(newUsert);
			   });
			};
			
			
var get = function(callback) {
	    var result = {};
	    Post.find(function(err, users) {
	        callback(users);
	    });
	};
	
	
var getGoogleByID = function(id,callback) {
	User.findOne({ 'google.id': id }, function (err, user) {
		  if (err) return handleError(err);
	        callback(user);
		})
};

var getLocalByID = function(id,callback) {
	User.findOne({ 'email': id }, function (err, user) {
		  if (err) return handleError(err);
		  callback(user);
		})
};

var getFacebookByID = function(id,callback) {
	User.findOne({ 'facebook.id': id }, function (err, user) {
		  if (err) return handleError(err);
		  callback(user);
		})
};


module.exports.getFacebookByID = getFacebookByID;
module.exports.addFacebook = addFacebook;