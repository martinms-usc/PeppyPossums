var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var app = express();
var Promise = require('bluebird');
var query = require('./queries.js');
// var mid = require('./middleware.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/..'));


var router = express.Router();
// for every request, log the metadata
router.use(function (req, res, next){
  console.log('just got the ' + req.method + 'request to ' + req.url);
  next();
})

router.get('/', function(req, res) {
  console.log('test');
  res.sendFile(path.join(__dirname + '/../index.html'));
})

router.post('/list', query.getList, function(req, res) {
  console.log('about to send response, bars are ' + res.bars);
  res.send()
})


// FUTURE LOGIN ROUTES
// router.get('/login', function(req, res) {
//   res.send('this is the login page');
// })

// router.post('/login', validatelogin, function(req, res) {
//   res.send('processing login')
// })



// apply routes to application
app.use('/', router);

app.listen(3000);

module.exports = app;

