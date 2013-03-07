/*
 * GET home page.
 */

 var ejs = require('ejs')
   , config = require('../config/config.js')
   , Blog = require('../models/blog');

exports.index = function (req, res) {
	Blog.find({}).sort({'date': 'descending'}).execFind( function (err, blogs) {
                // Disable cache so that the page refreshes
                res.setHeader('Cache-Control', 'no-store');
		res.render('index', {
			title: 'Sample Blog Application',
			blogs: blogs});
	});
};


exports.postComment = function(req, res) {
	var comment = {
		author: config.demo.user,
		body: req.body.body
	};

	Blog.update({_id: req.body.postId}, {$push: { 'comments' : comment }} , function(err, blog) {
        if(err) {
            console.err(err);
        } else {
            console.log(blog);
        }
    });

	res.redirect("/");
}


exports.setup = function(app) {
	app.get('/', exports.index);
	app.post('/postComment', exports.postComment);
};

/*
 * Filter to handle dates.
 */

 ejs.filters.displayDate = function(date) {
        return date;
 }
