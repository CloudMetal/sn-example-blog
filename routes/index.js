/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Sample Blog Application' });
};

exports.login = function(req, res){
  res.render('login', {});
};

exports.account = function(req, res){
  res.render('account', {});
};
