angular.module('WGLR', ['ui.bootstrap', 'uiGmapgoogle-maps'])


.config(function(uiGmapGoogleMapApiProvider) {
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

    console.log(haha);
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
.controller('AccordionDemoCtrl1', function ($scope) {
  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
})

.controller('UibAccordionController1', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
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

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
// .directive('uibAccordion', function() {
//   return {
//     controller: 'UibAccordionController',
//     controllerAs: 'accordion',
//     transclude: true,
//     templateUrl: function(element, attrs) {
//       return attrs.templateUrl || 'uib/template/accordion/accordion.html';
//     }
//   };
// })

// // The accordion-group directive indicates a block of html that will expand and collapse in an accordion
// .directive('uibAccordionGroup', function() {
//   return {
//     require: '^uibAccordion',         // We need this directive to be inside an accordion
//     transclude: true,              // It transcludes the contents of the directive into the template
//     replace: true,                // The element containing the directive will be replaced with the template
//     templateUrl: function(element, attrs) {
//       return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
//     },
//     scope: {
//       heading: '@',               // Interpolate the heading attribute onto this scope
//       isOpen: '=?',
//       isDisabled: '=?'
//     },
//     controller: function() {
//       this.setHeading = function(element) {
//         this.heading = element;
//       };
//     },
//     link: function(scope, element, attrs, accordionCtrl) {
//       accordionCtrl.addGroup(scope);

//       scope.openClass = attrs.openClass || 'panel-open';
//       scope.panelClass = attrs.panelClass || 'panel-default';
//       scope.$watch('isOpen', function(value) {
//         element.toggleClass(scope.openClass, !!value);
//         if (value) {
//           accordionCtrl.closeOthers(scope);
//         }
//       });

//       scope.toggleOpen = function($event) {
//         if (!scope.isDisabled) {
//           if (!$event || $event.which === 32) {
//             scope.isOpen = !scope.isOpen;
//           }
//         }
//       };
//     }
//   };
// })

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// .directive('uibAccordionHeading', function() {
//   return {
//     transclude: true,   // Grab the contents to be used as the heading
//     template: '',       // In effect remove this element!
//     replace: true,
//     require: '^uibAccordionGroup',
//     link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
//       // Pass the heading to the accordion-group controller
//       // so that it can be transcluded into the right place in the template
//       // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
//       accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
//     }
//   };
// })

// // Use in the accordion-group template to indicate where you want the heading to be transcluded
// // You must provide the property on the accordion-group controller that will hold the transcluded element
// .directive('uibAccordionTransclude', function() {
//   return {
//     require: '^uibAccordionGroup',
//     link: function(scope, element, attrs, controller) {
//       scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
//         if (heading) {
//           element.find('span').html('');
//           element.find('span').append(heading);
//         }
//       });
//     }
//   };
// });

