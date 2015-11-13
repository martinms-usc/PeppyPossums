angular.module('appControllers', [])

.controller('ZipCode', function($scope, $http) {




  $scope.sendZipCode  = function(zipCode) {
		var params = '{enter query}';
		return $http({
			method: 'GET',
			url: 'to the node server'
			data: params
		}).success(function(data) {
			console.log(data);
		});
	};


appControllers.controller('List', function($scope) {



});

appControllers.controller('DrinksMenu', function($scope) {

});



});

//Use for future feature
// appControllers.controller('getLocation', function($scope) {
// 	$scope.getLocation = function {
// 		var obj = {};
// 		var location = navigator.geolocation.getCurrentPosition(function(position) {
//     obj.lat = position.coords.latitude;
//     obj.long = position.coords.longitude;
//   }
// });