var User = require('../models/user')
  , Blog = require('../models/blog')

/*
 * GET resource listing.
 */
exports.list = function(model) {
  return function(req, res, next) {
    var mongoModel = null;
    if(model === 'users') {
      mongoModel = User; 
    } else if(model === 'blogs') {
      mongoModel = Blog; 
    } else {
      next();
      return;
    } 
    mongoModel.find(function (err, users) {
      if (err) console.log(err);
      else {
        res.send(200, users);
      }
    });
  }; 
}

