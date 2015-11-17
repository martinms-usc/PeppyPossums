angular.module('WGLR', ['ui.bootstrap', 'ngAnimate', 'uiGmapgoogle-maps'])


.config(function(uiGmapGoogleMapApiProvider ) {
  // $urlRouterProvider.otherwise('/main');
  // $stateProvider
  //   .state('main', {
  //     url: '/',
  //     controller: 'appController',
  //     templateUrl: 'homepage.html'
  //   })
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

.controller('appController', function($scope, $http, uiGmapGoogleMapApi) {

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
      $scope.list = res.data;
      //Gather Data for google maps
      uiGmapGoogleMapApi.then(function(maps) {
        console.log("Working");
        $scope.markerList = [];
        for (var key in $scope.list) {
          var latitude = $scope.list[key].location.coordinate.latitude;
          var longitude = $scope.list[key].location.coordinate.longitude;
          var name = $scope.list[key].name;
          var ratings = $scope.list[key].rating_img_url_small;
          $scope.markerList.push({id: key, latitude: latitude, longitude: longitude, name: name, ratings: ratings });
        }
        //average latitude
        $scope.map = {center: { latitude: res.data[0].location.coordinate.latitude, longitude: res.data[0].location.coordinate.longitude }, zoom: 8 };
      });
    });
  }
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



