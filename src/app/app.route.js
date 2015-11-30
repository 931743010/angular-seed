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
            load: ['$ocLazyLoad', function($ocLazyLoad){
                $ocLazyLoad.load(['app/app.controller.js']);
            }]
        },
        controller: 'AppController as app'
    });
}]);