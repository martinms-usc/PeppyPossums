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

app.use(express.static(__dirname + '/..'));

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

listRouter.post('/', query.getList, function(req, res) {
  console.log('getting a POST request for /list');
  res.send(res.bars);
})

listRouter.get('/', function(req, res) {
  console.log('getting a GET request for /list');
  res.redirect(__dirname + '/../index.html');
})


var userRouter = express.Router();

userRouter.get('/login', function(req, res) {
  console.log('###### JUST GOT LOGIN REQUEST #######');
  res.sendFile(path.join(__dirname + '../client/register.html'));
})
userRouter.post('/login', mid.validateLogin, function(req, res) {
  console.log('user was validated, redirecting to main');

  res.redirect('/list');
})

userRouter.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname + '../client/register.html'));
})
userRouter.post('/signup', mid.processSignup, function(req, res) {
  console.log('user was just added to database, redirecting to main')
  res.redirect('/list');
})

userRouter.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  })
})
// userRouter.post('/add', mid.checkUser, function(req, res) {
//   res.send('success');
// })

// apply routes to application
app.use('/list', listRouter);
app.use('/user', userRouter);

app.listen(3000);

module.exports = app;

