var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var app = express();
var Promise = require('bluebird');
var query = require('./queries.js');
var mid = require('./middleware.js');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// these two do the same thing (line 15 & line 16-18)
app.use(express.static(__dirname + '/..'));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/../index.html'));
// })

// for every request, log the metadata
app.use(function (req, res, next){
  console.log('just got the ' + req.method + ' request to ' + req.url);
  next();
})

app.use(session({
  secret: "white girls love rooftops",
  resave: false,
  saveUninitialized: true
}));

var listRouter = express.Router();
listRouter.post('/', query.getList, function(req, res, next) {
  res.send(res.bars);
})


var userRouter = express.Router();
userRouter.get('/login', function(req, res) {
  res.send('this is the login page');
})
userRouter.post('/login', mid.validateLogin, function(req, res) {
  console.log('user was just added to database, redirecting to main')
  res.redirect('/list');
})
userRouter.get('/signup', function(req, res) {
  res.send('here is the signup page');
})
userRouter.post('/signup', mid.processSignup, function(req, res, next) {
  console.log('user was just added to database, redirecting to main')
  res.redirect('/list');
})
userRouter.post('/add', mid.checkUser, function(req, res) {
  res.send('success');
})

// apply routes to application
app.use('/list', listRouter);
app.use('/user', userRouter);

app.listen(3000);

module.exports = app;

