var myApp = angular.module('WGLR', ['appControllers']);

myApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.
	  otherwise('/main');
	$stateProvider
		.state('list', {
			url: '/list',
			controller: 'List',
			templateUrl: 'partials/list.html'
		})
		.state('drinksmenu', {
			url: 'list/drinksmenu',
			controller: 'DrinksMenu',
			templateUrl: 'partials/drinksmenu.html'
		}
});

