
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , resource = require('./routes/resource')
  , http = require('http')
  , path = require('path')
  , config = require('./config/config.js')
  , mongo = require('./mongo-store.js');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.cors.allowedDomains || '*');
    res.header('Access-Control-Allow-Methods', config.cors.allowedMethos || 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', config.cors.allowedHeaders || '*');
    //deal with OPTIONS method
    if (req.method == 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
};

var app = express();
module.exports = app;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
// app.get('/login', routes.login);
// app.get('/account', routes.account);

// Create a new entity
app.post('/rest/:resource', resource.create(mongo.mongoose));

// List the entities
app.get('/rest/:resource', resource.list(mongo.mongoose));

// Find the entity by id
app.get('/rest/:resource/:id', resource.findById(mongo.mongoose));

// Update the entity by id
app.put('/rest/:resource/:id', resource.updateById(mongo.mongoose));

// Delete the entity by id
app.delete('/rest/:resource/:id', resource.deleteById(mongo.mongoose));

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
