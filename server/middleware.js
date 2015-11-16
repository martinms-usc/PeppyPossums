var query = require('./queries');


exports.validateLogin = function() {}


exports.processSignup= function(req, res, next) {

	query.addUser(req, res)

	next();
}



var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.redirect(301, '/login');
  } else {
    next();
  }
};