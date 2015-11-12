var express = require('express');
var path = require('path');
var bodyParser  = require('body-parser');
var request = require('request');
var fire = require('firebase');
var app = express();
var Promise = require('bluebird');


var ref = new fire('https://rooftopapp.firebaseio.com/')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//update path names based on where index.html file is located
// app.use(express.static(__dirname + '/..'));
app.get('/', function(req, res) {
	console.log('test');
	// ref.on("value", function(snapshot) {
 //  		console.log(snapshot.val());
	// }, function (errorObject) {
 //  		console.log("The read failed: " + errorObject.code);
	// });
	res.sendFile(path.join(__dirname + '/../index.html'));
})

var dbMiddleware = function(req, res, next) {
	// ref.orderByChild('location/postal_code').equalTo('90401').on('child_added', function(snapshot) {
	// 	console.log(snapshot.val().name);
	// 	arr.push(snapshot.val().name);
	// })
	res.bars = []
	var dbQuery = function () {
			ref.orderByChild('location/city').equalTo('Los Angeles').on('child_added', function(snapshot) {
				// console.log(snapshot.val().name);
				res.bars.push(snapshot.val().name);
			})


	}
	console.log(dbQuery, 'FUNCTION');
	dbQuery().then(function() {
		next();
	})
	
}

app.post('/', dbMiddleware, function(req, res) {
	// console.log(res.bars);
	res.send('test')

	
	// .then(
	// 	res.send(JSON.stringify(arr));

	// 	)

})

app.listen(3000);
module.exports = app;