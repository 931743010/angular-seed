angular.module('app').config(['$provide', '$stateProvider', '$urlRouterProvider', function($provide, $stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'app/index.html',
        resolve: {
            //enum
            status: ['$ocLazyLoad', '$injector', function($ocLazyLoad, $injector) {
                return $ocLazyLoad.load(['app/shared/status/status.service.js']).then(function() {
                    return $injector.get('statusService').get().then(function(data) {
                        return $provide.constant('Status', data);
                    });
                });
            }],
            //面包 - 屑
            bread: ['$ocLazyLoad', '$injector', function($ocLazyLoad, $injector) {
                return $ocLazyLoad.load(['app/bread/bread.service.js']).then(function() {
                    return $injector.get('breadService').get().then(function (response) {
                        return response.data;
                    });
                });
            }],
        },
        controllerAs: 'vm',
        controller: ['$rootScope', '$scope', '$state', 'bread', function($rootScope, $scope, $state, bread) {

            var vm = this;
            vm.breadcrumb = [];

            var crumb = {};
            (function flatten(a, dest) {
                var i = 0,
                    j = a.length;
                for (; i < j; i++) {
                    dest[a[i].alias || a[i].href] = a[i];
                    if (a[i].children && a[i].children.length > 0) {
                        arguments.callee(a[i].children, dest);
                    }
                }
            })(bread, crumb);


            $scope.$on('$stateChangeSuccess', function() {

                vm.breadcrumb = [];
                var current = $state.$current.name,
                    states = current.split('.'),
                    i = 2,
                    j = states.length;
                for (; i <= j; i++) {
                    var stateItem = states.slice(0, i).join('.');
                    if (crumb[stateItem]) {
                        $rootScope.title = crumb[stateItem].title;
                        vm.breadcrumb.push(crumb[stateItem]);
                    }
                }
                if (current.indexOf('app.home') !== 0) {
                    vm.breadcrumb.unshift(crumb['app.home']);
                }
            });
        }]
    });
}]);