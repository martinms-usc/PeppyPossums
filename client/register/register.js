angular.module('register', [])

.controller('formController', function($scope) {

	$scope.submitLogin = function(email, pass) {
		$http({
			method: "POST",
			url: "https://rooftopapp.firebaseio.com/user/login",
			data: {email: email, password: pass}
		}).then(function(response) {
			console.log('successful post to login');
		}, function(response) {
			console.log('there was an error, dumbass');
		})
	}

	$scope.submitSignup = function(email, pass) {
		$http({
			method: "POST",
			url: "https://rooftopapp.firebaseio.com/user/signup",
			data: {email: email, password: pass}
		}).then(function(response) {
			console.log('successful post to signup');
		}, function(response) {
			console.log('there was an error, dumbass');
		})
	}

})