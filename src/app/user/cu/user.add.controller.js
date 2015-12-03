(function() {
    'use strict';
    angular.module('app.user').controller('UserAddController', Controller);
    Controller.$inject = ['$scope', 'userService'];

    function Controller($scope, userService) {
        var that = this;
        that.$scope = $scope;
        that.userService = userService;
        that.isSubmitting = false;
        that.userName = null;
        that.realName = null;
        that.password = null;
        that.passwordConfirm = null;
    }
    
    Controller.prototype.add = function() {
        var that = this;
        that.isSubmitting = true;

        that.userService.add(that.userName, that.fullName, that.password).success(function(response) {
            that.isSubmitting = false;

            that.$scope.$state.go('^');

        });
    };
})();