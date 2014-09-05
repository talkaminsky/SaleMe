var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectIdSchema = Schema.ObjectId
    , ObjectId = mongoose.Types.ObjectId;

var UserSchema   = new Schema({
   _id :{type: ObjectIdSchema, default: function(){ return new ObjectId(); }},
    firstName: String,
    lastName: String,
    email :  { type: String, required : true },
    age   :  { type: Number, min: 18, max: 65 },
    creationdDate :  { type: Date, default: Date.now },
    profilePicture :  String,
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});
var User = mongoose.model('User', UserSchema);


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




