
angular.module('app').factory('breadService', ['$http', 'AppConfig', function ($http, config) {

    return {
        get: function () {
            return $http.get('app/bread/bread.json');
        }
    };
}]);
