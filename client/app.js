angular.module('WGLR', [])

.controller('appController', function($scope, $http) {

  $scope.list = [];

  $scope.sendZipCode  = function(searchParam) {
    // var params = '{enter query}';
    var integers = ['0','1','2','3','4','5','6','7','8','9']
    var data;
    if(integers.indexOf(searchParam[0]) >= 1) {
    	data = {zipCode: searchParam}
    } else {
    	data = {city: searchParam}
    }
    console.log(data)
    return $http({
      method: 'POST',
      url: '/list',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: data
    }).then(function(res) {
    	console.log('made it here');
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

