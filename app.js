var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var session = require('express-session');
var sanitizeHtml = require('sanitize-html');
var nodemailer = require('nodemailer');
//var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var venuesRouter = require('./routes/venues');
var adminsRouter = require('./routes/admins');


var app = express();

var dbConnectionPool = mysql.createPool({ host: 'localhost', database: 'covid'});
app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*
app.use(passport.initialize());
app.use(passport.session());
*/
app.use(session({
 secret: 'a string of your choice',
 resave: false,
 saveUninitialized: true,
 cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/venues', venuesRouter);
app.use('/admins', adminsRouter);


app.use('/users', express.static(path.join(__dirname, 'private')));
app.use('/venues', express.static(path.join(__dirname, 'privateVenue')));
app.use('/admins', express.static(path.join(__dirname, 'privateAdmin')));

module.exports = app;
