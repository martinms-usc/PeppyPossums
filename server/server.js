var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var fire = require('firebase');
var app = express();
var Promise = require('bluebird');
var Fireproof = require('fireproof')
Fireproof.bless(Promise);


var ref = new fire('https://rooftopapp.firebaseio.com/');
var fireproof = new Fireproof(ref);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//update path names based on where index.html file is located
// app.use(express.static(__dirname + '/..'));
app.get('/', function(req, res) {
  console.log('test');
  res.sendFile(path.join(__dirname + '/../index.html'));
})

app.post('/', function(req, res) {
   // console.log(res.bars);
  res.bars = []
  // console.log(req.body);
  // console.log(JSON.parse(req.body));
  fireproof.orderByChild('location/city').equalTo('Los Angeles').on('child_added', function(snapshot) {
    // console.log(snapshot.val().name);
    res.bars.push(snapshot.val().name);
  }).then(function() {
    console.log(res.bars)
    res.send(res.bars);
  }, function(err) {
    console.error(err);
  })

})

app.listen(3000);
module.exports = app;