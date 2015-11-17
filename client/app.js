angular.module('WGLR', ['ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps', 'ui.router'])


.config(function(uiGmapGoogleMapApiProvider , $stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('main', {
      url: '/',
      controller: 'appController',
      templateUrl: 'homepage.html'
    })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'xxxx.html'
    // })

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCyhGXFgrHmsvQkerWmO20WwZsvrc9xfjs',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})

.controller("MapController", function($scope, uiGmapGoogleMapApi) {
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    // Do stuff with your $scope.
    var haha;

    console.log("haha");
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
  uiGmapGoogleMapApi.then(function(maps) {
    console.log("working!");
  });
})

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
  }



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
})
.controller('AccordionDemoCtrl', function ($scope) {
  $scope.oneAtATime = true;

  // $scope.groups = [
  //   {
  //     title: 'Dynamic Group Header - 1',
  //     content: 'Dynamic Group Body - 1'
  //   },
  //   {
  //     title: 'Dynamic Group Header - 2',
  //     content: 'Dynamic Group Body - 2'
  //   }
  // ];

  // $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  // $scope.addItem = function() {
  //   var newItemNo = $scope.items.length + 1;
  //   $scope.items.push('Item ' + newItemNo);
  // };

  // $scope.status = {
  //   isFirstOpen: true,
  //   isFirstDisabled: false
  // };
})

.controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ?
      $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if (closeOthers) {
      angular.forEach(this.groups, function(group) {
        if (group !== openGroup) {
          group.isOpen = false;
        }
      });
    }
  };

  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function(event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  };
}])



