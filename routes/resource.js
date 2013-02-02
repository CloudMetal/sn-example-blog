var User = require('../models/user')
  , Blog = require('../models/blog');

exports.create = function(mongoose) {
  var mongo = mongoose;
  return function(req, res, next) {
    var mongoModel = mongo.model(req.params.resource);
    if(!mongoModel) {
      next();
      return;
    }
    var id = req.params.id;
    mongoModel.create(id, req.body, function (err, obj) {
      if (err) {
        console.log(err);
        res.send(500, err);
      }
      else {
        res.send(200, obj);
      }
    });
  };
}

/*
 * GET resource listing.
 */
exports.list = function(mongoose) {
  var mongo = mongoose;
  return function(req, res, next) {
    var mongoModel = null; 
    try {
      mongoModel = mongo.model(req.params.resource);
    } catch(err) {
      console.log(err);
    } 
    if(!mongoModel) {
      next();
      return;
    } 
    var options = {};
    if(req.params.skip) {
      options.skip = req.params.skip;
    }
    if(req.params.limit) {
      options.skip = req.params.limit;
    }
    mongoModel.find(options, function (err, objs) {
      if (err) {
        console.log(err);
        res.send(500, err);
      } else {
        res.send(200, objs);
      }
    });
  }; 
}

exports.findById = function(mongoose) {
  var mongo = mongoose;
  return function(req, res, next) {
    var mongoModel = mongo.model(req.params.resource);
    if(!mongoModel) {
      next();
      return;
    }
    var id = req.params.id;
    mongoModel.findById(id, function (err, obj) {
      if (err) {
        console.log(err);
        res.send(404, err);
      }
      else {
        res.send(200, obj);
      }
    });
  };
}

exports.deleteById = function(mongoose) {
  var mongo = mongoose;
  return function(req, res, next) {
    var mongoModel = mongo.model(req.params.resource);
    if(!mongoModel) {
      next();
      return;
    }
    var id = req.params.id;
    mongoModel.findByIdAndRemove(id, function (err, obj) {
      if (err) {
        console.log(err);
        res.send(404, err);
      }
      else {
        res.send(200, obj);
      }
    });
  };
}

exports.updateById = function(mongoose) {
  var mongo = mongoose;
  return function(req, res, next) {
    var mongoModel = mongo.model(req.params.resource);
    if(!mongoModel) {
      next();
      return;
    }
    var id = req.params.id;
    mongoModel.findByIdAndUpdate(id, req.body, function (err, obj) {
      if (err) {
        console.log(err);
        res.send(404, err);
      }
      else {
        res.send(200, obj);
      }
    });
  };
}

