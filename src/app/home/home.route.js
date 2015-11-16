
angular.module('app.home').config(['$stateProvider', function ($stateProvider) {

    $stateProvider.state('app.home', {
        url: '/',
        templateUrl: 'app/home/index.html',
        resolve:{
            load:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load('app/home/home.controller.js');
            }]
        },
        controller: 'HomeController as vm'
    });

}]);