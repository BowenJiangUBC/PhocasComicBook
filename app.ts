///<reference path='types/DefinitelyTyped/node/node.d.ts'/>
///<reference path='types/DefinitelyTyped/express/express.d.ts'/>
interface Error {

  status?: number;

}
class Application {
  app;

  constructor() {

    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');

    var mongo = require('mongodb');
    var uri = 'mongodb://heroku_r774rtpz:pstcp2u20hiip964460qsrl1o@ds061385.mongolab.com:61385/heroku_r774rtpz';
    var monk = require('monk');
    //var db = monk('mongodb://localhost:27017/phocas');
    //var db = monk("mongodb://heroku_x1w4rl5d:Rockluo66!!@ds061375.mongolab.com:61375/heroku_x1w4rl5d");
    var db = monk(uri);

      var routes = require('./routes/index');
      var users = require('./routes/users');
      var app = express();

    app.use(express.static(path.join(__dirname, 'public/')));

// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

// Make our db accessible to our router
    app.use(function(req,res,next){
      req.db = db;
      next();
    });

    app.use('/', routes);
    app.use('/users', users);

// catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

// error handlers

// development error handler
// will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });

    this.app = app;
  }
}
var application = new Application();
module.exports = application.app;
