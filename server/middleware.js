var query = require('./queries');
var bcrypt = require('bcrypt');
var session = require('express-session');
var promisify = require("promisify-node");

exports.validateLogin = function(req, res, next) {
	var em = req.body.email;
	var pass = req.body.password;
	var user = {email: em, password: pass};

	var wrap = promisify(query.findUser);

	wrap(req, res, user, loginCallback)
	.then(function(req, res) {
		console.log('find user worked, logincallback ran');
		next();
	});
	// attempt to fetch user from database
	// function(foundUser) {
	// 	if (!foundUser) {
	// 		console.log('username was not found');
	// 		res.redirect(301, '/login');
	// 	} else {
	// 		console.log('user was found, data returned is ' + foundUser);
	// 		console.log('user pass ' + foundUser.password);
	// 		// test given password against saved
	// 		if (foundUser.password === req.body.password) {
	// 			// if match, create session and redirect to main
	// 			createSession(req, res, user);
	// 		} else {
	// 			console.log('error, incorrect password');
	// 			res.send('Wrong Password!!')
	// 		}
	// 	}
	// }
}

var loginCallback =	function(req, res, user, foundUser) {
	console.log('inside logincallback');
	if (!foundUser) {
		console.log('username was not found');
		res.redirect(301, '/login');
	} else {
		console.log('user was found in db username is ' + foundUser.email)
		console.log('user pass ' + foundUser.password);
		// test given password against saved
		if (foundUser.password === req.body.password) {
			// if match, create session and redirect to main
			console.log('PASSWORDS MATCH');
			return (req, res);
			// createSession(req, res, user);
		} else {
			console.log('Error, incorrect password');
			res.end();
		}
	}
}

exports.processSignup = function(req, res, next, signupCallback) {
	var em = req.body.email;
	var pass = req.body.password;
	var newUser = {email: em, password: pass};

	query.addUser(req, res, newUser, signupCallback);
	next();
};

var signupCallback = function(user) {
	console.log('process signup promise, new user is ' + newUser.email);
	createSession(req, res, newUser);
};

var createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect(301, '/list');
    });
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};

var isLoggedIn = function(req) {
  return req.session ? !! req.session.user : false;
};

