var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    author:{type:String},
    title:{type:String},
    body:{type:String},
    created_at:{type:Date}
});

var BlogSchema = new Schema({
    id:{type:String},
    title:{type:String},
    body:{type:String},
    author:{type:String},
    created_at:{type:Date},
    modified_at:{type:Date},
    comments: [CommentSchema]
});

CommentSchema.pre('save', function (next) {
    var _this = this;
    if (this.isNew)
        this.created_at = Date.now();
    next();
});

var Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
