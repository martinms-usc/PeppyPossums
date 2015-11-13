angular.module('WGLR', [])

.controller('appController', function($scope, $http) {

  $scope.list = [];

  $scope.sendZipCode  = function(zipCode) {
    // var params = '{enter query}';
    return $http({
      method: 'POST',
      url: '/list',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: {zipCode: zipCode}
    }).then(function(res) {
      console.log(res.data);
      $scope.list = res.data
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

