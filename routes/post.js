var config = require('../config/config.js')
    , Blog = require('../models/blog');


exports.post = function(req, res) {
 	res.render('post', {
		title: 'Sample Blog Application - New Blog post',
                author: req.user.username
	});
}

exports.save = function(req, res) {
	Blog.create({title: req.body.title, body: req.body.body, author: req.user.username}, function(err, blog) {
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
