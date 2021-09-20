var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
require('dotenv/config'); //Used for importing tokens/apikeys etc.
const { body,validationResult } = require("express-validator"); //Used for validating forms



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cityguideRouter = require('./routes/cityguide');  //Import routes for cityguide

var app = express();


//Import the mongoose module
var mongoose = require('mongoose');
// Set up mongoose (hence MongoDB) connection
var mongoDB = process.env.MongooseToken; //Url for Mongoose Connection in .env file
// var mongoDB = 'mongodb://localhost/27017';  //Using locally hosted database
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cityguide', cityguideRouter);  // Add cityguide routes to middleware chain.





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
