var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author:{type:String, index: true},
    title:{type:String},
    body:{type:String},
    date:{type:Date},
});

var BlogSchema = new Schema({
    title:{type:String, index: true},
    body:{type:String},
    author:{type:String, index: true},
    date:{type:Date},
    tags:{type:[String], index: true}, 
    comments: [CommentSchema]
});

function setDate(next) {
    var now = Date.now();
    if (this.isNew)
        this.date = now;
    this.comments.forEach(function(comment) {
       if(!comment.date) {
           comment.date = now;
       }
    });
    next();
}

BlogSchema.pre('save', setDate); 

var Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
