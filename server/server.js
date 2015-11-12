var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//update path names based on where index.html file is located
app.use(express.static(__dirname + '/..'));
app.get('/', function(req, res) {
	console.log('test');
	res.sendFile(path.join(__dirname + '/../index.html'));
})

app.listen(3000);
module.exports = app;