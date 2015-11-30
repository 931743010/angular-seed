//
//modules,config,constant,run
//
angular.module('app.filters', []);
angular.module('app.services', []);
angular.module('app.directives', []);

angular.module('app.nav', []);

angular.module('app.home', []);

angular.module('app.user', []);

angular.module('app.role', []);

/* app */
angular.module('app', [
    'ngRoute',
    'ngSanitize',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'smart-table',
    'oc.lazyLoad',
    'app.directives',
    'app.services',
    'app.filters',
    'app.nav',
    'app.home',
    'app.user',
    'app.role'])
    .config(['$httpProvider', function ($httpProvider) {

        //$httpProvider.defaults.withCredentials = true;

        $httpProvider.interceptors.push(['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {


            return {
                request: function (config) {
                    $rootScope.pendingCount++;
                    return config;
                },
                requestError: function (config) {

                },
                response: function (response) {
                    $rootScope.pendingCount--;
                    return response;
                },
                responseError: function (response) {

                    // var status = response.status;
                    // if (status == 401) {
                    //     $location.path('/login');
                    // }
                    return $q.reject(response);
                }
            };
        }]);
    }])
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        // $ocLazyLoadProvider.config({
        //  debug: true
        // });
    }])
    .config(['stConfig', function (stConfig) {
        stConfig.pagination.itemsByPage = 10;
        //stConfig.pagination.displayedPages = 5;
    }])
    .constant('AppConfig', {
        theme: 'default',
        serverBaseUrl: 'http://localhost:63342/',
        staticBaseUrl: ''
    })
    .run(['$rootScope', '$state', '$stateParams', 'AppConfig', function ($rootScope, $state, $stateParams, AppConfig) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.pendingCount = 0;
        $rootScope.AppConfig = AppConfig;
    }])
    .run(['$window', '$rootScope', '$state', function($window, $rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //进入state count清零
            $rootScope.pendingCount = 0;

            //权限验证

        });
    }]);
