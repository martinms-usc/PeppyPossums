angular.module('WGLR', [])

.controller('appController', function($scope, $http) {

  $scope.sendZipCode  = function(zipCode) {
    // var params = '{enter query}';
    return $http({
      method: 'POST',
      url: '/',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: zipCode
    }).then(function(data) {
      console.log("called");
    });
  };


// appControllers.controller('List', function($scope) {


// });

// appControllers.controller('DrinksMenu', function($scope) {

// });



// });

// myApp.config(function($stateProvider, $urlRouterProvider) {
// 	$urlRouterProvider.
// 	  otherwise('/main');
// 	$stateProvider
// 		.state('list', {
// 			url: '/list',
// 			controller: 'List',
// 			templateUrl: 'views/list.html'
// 		})
// 		.state('drinksmenu', {
// 			url: 'list/drinksmenu',
// 			controller: 'DrinksMenu',
// 			templateUrl: 'views/drinksmenu.html'
// 		}
});

