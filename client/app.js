angular.module('?', [])

.config(function($routeProvider, $httpProvider) {
	$routerProvider
	  .when('place route link here', {
	  	templateUrl: 'place directory here',
	  	controller: 'place controller here'
	  });
})