(function() {
    'use strict';
    angular.module('app.role').controller('RoleModalController', Controller);
    Controller.$inject = ['$modalInstance', '$ocLazyLoad', '$injector', 'action', 'role'];

    function Controller($modalInstance, $ocLazyLoad, $injector, action, role) {
        var that = this;
        that.$modalInstance = $modalInstance;
        that.$ocLazyLoad = $ocLazyLoad;
        that.$injector = $injector;
        that.action = action;
        that.role = role;

        that.isSubmitting = false;

    }
    Controller.prototype.add = function() {
        var that = this;
        that.isSubmitting = true;
        that.$ocLazyLoad.load('app/role/role.service.js').then(function() {
            var roleService = that.$injector.get('roleService');
            roleService.add(that.role.roleName).success(function(response) {
                that.isSubmitting = false;

                that.$modalInstance.close();

            });
        });
    };

    Controller.prototype.edit = function() {
        var that = this;
        that.isSubmitting = true;
        that.$ocLazyLoad.load('app/role/role.service.js').then(function() {
            var roleService = that.$injector.get('roleService');
            roleService.edit(that.role.roleId, that.role.roleName).success(function(response) {
                that.isSubmitting = false;

                that.$modalInstance.close();

            });
        });
    };

    Controller.prototype.cancel = function() {
        this.$modalInstance.dismiss();
    };
})();