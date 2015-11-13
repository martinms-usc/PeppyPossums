var fire = require('firebase');
var Fireproof = require('fireproof');
var Promise = require('bluebird');
Fireproof.bless(Promise);

var ref = new fire('https://rooftopapp.firebaseio.com/');
var fireproof = new Fireproof(ref);

exports.getList = function(req, res, next) {
  res.bars = [];

	if (req.body.city) {
		console.log('got a city search for ' + req.body.city);

		fireproof.orderByChild('location/city')
		.equalTo(req.body.city)
		.on('child_added', function(snapshot) {
	    res.bars.push(snapshot.val().name);
	  })
	  .then(function(req, res, next) {
	  	next();
	  })
	} else if (req.body.zipCode) {
		console.log('got a zip search for ' + req.body.zipCode);

		fireproof.orderByChild('location/postal_code')
		.equalTo(req.body.zipcode)
		.on('child_added', function(snapshot) {
			res.bars.push(snapshot.val().name);
  	})
  	.then(function(req, res, next) {
  		next();
  	})
	}
};

