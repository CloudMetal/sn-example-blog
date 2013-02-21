/*
 * GET home page.
 */

 var ejs = require('ejs')
   , moment = require('moment')
   , Blog = require('../models/blog');

exports.index = function (req, res) {
	Blog.find( function (err, blogs, count) {
		res.render('index', {
			title: 'Sample Blog Application',
			blogs: blogs});
	});
};

/*
 * Filter to handle dates.
 */

 ejs.filters.displayDate = function(date) {
 	return moment(date).format("MMM D, YYYY");
 }
