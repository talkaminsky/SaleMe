var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectIdSchema = Schema.ObjectId
    , ObjectId = mongoose.Types.ObjectId;
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
     _id :{type: ObjectIdSchema, default: function(){ return new ObjectId(); }},
    fullName : String,
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// checking if password is valid using bcrypt
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// this method hashes the password and sets the users password
userSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};

// create the model for users and expose it to our app
var User = mongoose.model('User', userSchema);


var CommentSchema   = new Schema({
    _id :{type: ObjectIdSchema, default: function(){ return new ObjectId(); }},
    content: String,
    likes : [String],
    creationDate :  { type: Date, default: Date.now },
});

var Comment = mongoose.model('Comment', CommentSchema);

var PostSchema   = new Schema({
    _id :{type: ObjectIdSchema, default: function(){ return new ObjectId(); }},
    title :  { type: String, required : true },
    content: String,
    user: String,
    creationDate : { type: Date, default: Date.now },
    updateDate :  { type: Date, default: Date.now },
    likes : [String],
    views :  Number,
    comments : [CommentSchema]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = {
    Post: Post,
    Comment : Comment,
    User: User
};




