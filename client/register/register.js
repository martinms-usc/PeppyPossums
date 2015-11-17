angular.module('register', [])

.controller('formController', function($scope, $http) {

	$scope.submitLogin = function(email, pass) {
		console.log('login input is ' + email + pass)
		$http({
			method: "POST",
			url: "/user/login",
			data: {email: email, password: pass},
			headers: {
        "Content-Type": "application/JSON"
      }
		}).then(function(response) {
			console.log('successful post to login');
			console.log('response url is ' + response.url);
		}, function(response) {
			console.log('there was an error, dumbass');
		})
	}

	$scope.submitSignup = function(email, pass) {
		$http({
			method: "POST",
			url: "/user/signup",
			data: {email: email, password: pass}
		}).then(function(response) {
			console.log('successful post to signup');
		}, function(response) {
			console.log('there was an error, dumbass');
		})
	}

})