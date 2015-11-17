var fire = require('firebase');
var Fireproof = require('fireproof');
var Promise = require('bluebird');
var ref = new fire('https://rooftopapp.firebaseio.com/');
var fireproof = new Fireproof(ref);
Fireproof.bless(Promise);
var usersRef = fireproof.child('users');


// search queries
exports.getList = function(req, res, next) {
  res.bars = [];
  console.log(req.body.zipCode);
	if (req.body.city) {
		// console.log('got a city search for ' + req.body.city);
		queryDB(req, res, next, 'location/city', req.body.city);
	} else if (req.body.zipCode) {
		// console.log('got a zip search for ' + req.body.zipCode);
		queryDB(req, res, next, 'location/postal_code', req.body.zipCode);
	}
};

// helper for getList^
function queryDB(req, res, next, searchParam, queryParam) {
	console.log('going to look for bars in the db');
	fireproof.orderByChild(searchParam)
	.equalTo(queryParam)
	.on('child_added', function(snapshot) {
		res.bars.push(snapshot.val());
	})
	.then(function() {

		next();
	})
};

// user queries
exports.addUser = function(req, res, user, callback) {
	console.log('adding user');
	// alternatively : 
	// var fire = new Firebase('http://rooftopapp.firebaseio.com/users')
	// fire.push(user);
	usersRef.push(user);
	callback(user);
};

exports.findUser = function(req, res, user, callback) {
	console.log('going to look for user in db');
	var found;
	usersRef.orderByChild('email')
	.equalTo(req.body.email)
	.on('child_added', function(snapshot) {
		console.log('User was found: ' + snapshot.val());
		found = snapshot.val();
	})
	.then(function() {
		console.log('queries.js user was found, running callback');
		callback(req, res, user, found);
	})
};


// firebase's user creation method, leave this just in case
	// fireproof.createUser({
	// 	email: req.body.email,
	// 	password: req.body.password
	// }, function(error, userData) {
	//   if (error) {
	//     switch (error.code) {
	//       case "EMAIL_TAKEN":
	//         console.log("The new user account cannot be created because the email is already in use.");
	//         break;
	//       case "INVALID_EMAIL":
	//         console.log("The specified email is not a valid email.");
	//         break;
	//       default:
	//         console.log("Error creating user: ", error);
	//     }
	//   } else {
	//     console.log("Successfully created user account with uid:", userData.uid);
	//   }
	// })
	// .then(function () {
	// 	next();
	// })
	// }

