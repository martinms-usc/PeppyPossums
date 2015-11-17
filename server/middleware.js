var query = require('./queries');
var bcrypt = require('bcrypt');
var session = require('express-session');

exports.validateLogin = function(req, res, next) {
	var em = req.body.email;
	var pass = req.body.password;
	var user = {email: em, password: pass};

	query.findUser(req, res)
	// attempt to fetch user from database
	.then(function(foundUser) {
		if (!foundUser) {
			console.log('username was not found');
			res.redirect(301, '/login');
		} else {
			console.log('user was found, data returned is ' + foundUser);
			console.log('user pass ' + foundUser.password);
			// test given password against saved
			if (foundUser.password === req.body.password) {
				// if match, create session and redirect to main
				createSession(req, res, user);
			} else {
				console.log('error, incorrect password');
				res.send('Wrong Password!!')
			}
		}
	})
}

exports.processSignup = function(req, res, next) {
	var em = req.body.email;
	var pass = req.body.password;
	var newUser = {email: em, password: pass};

	query.addUser(req, res, user)
	.then(function(newUser) {
		console.log('process signup promise, new user is ' + newUser.email);
		createSession(req, res, newUser);
		next();
	})
}

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

