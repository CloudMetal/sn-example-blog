 var moment = require('moment')
   , config = require('../config/config.js')
   , Blog = require('../models/blog');


exports.post = function(req, res) {
 	res.render('post', {
		title: 'Sample Blog Application - New Blog post'
	});
}

exports.save = function(req, res) {
	Blog.create({title: req.body.title, body: req.body.body, author: config.demo.user}, function(err, blog) {
        if(err) {
            console.err(err);
        } else {
            console.log(blog);
        }
    });
	res.redirect("/");
}

exports.setup = function(app) {
  app.get('/post', exports.post);
  app.post('/post', exports.save);
};