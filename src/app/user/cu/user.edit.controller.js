(function() {
    'use strict';
    angular.module('app.user').controller('UserEditController', Controller);
    Controller.$inject = ['$scope', '$stateParams', 'userService'];

    function Controller($scope, $stateParams, userService) {
        var that = this;
        that.$scope = $scope;
        that.userService = userService;
        that.isSubmitting = false;
        that.userId = Number($stateParams.userId);

        that.username = null;
        that.fullName = null;
        that.password = null;
        that.passwordConfirm = null;


        getUserInfo();

        function getUserInfo() {

            that.userService.getUserInfo(that.userId).success(function(response) {

                var data = response.data;

                that.userName = data.userName;
                that.fullName = data.fullName;



            });
        }
    }

    Controller.prototype.edit = function() {
        var that = this;
        that.isSubmitting = true;

        that.userService.edit(that.userId, that.fullName, that.password).success(function(response) {
            that.isSubmitting = false;

            that.$scope.$state.go('^');

        });
    };
})();