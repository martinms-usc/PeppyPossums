angular.module('userModule', [])
.controller('userModuleController', function($scope) {
	$scope.loginUser = function(email, password) {
		return $http({
      method: 'POST',
      url: '/user/login',
      headers: {
        "Content-Type": "application/JSON"
      },
      data: {email: email, password: password}
    })
    // .then(function(res) {
    // 	console.log('made it here');
    //   console.log(res.data);
    //   $scope.list = res.data
    // });
	}
})