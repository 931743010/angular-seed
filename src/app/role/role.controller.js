(function() {
    'use strict';
    angular.module('app.role').controller('RoleController', Controller);
    Controller.$inject = ['$modal', 'roleService'];

    function Controller($modal, roleService) {
        var that = this;

        that.$modal = $modal;
        that.roleService = roleService;

        that.roleDataTable = [];
        that.getRoleList = getRoleList;
        that.totalCount = 0;

        that.isEmpty = false;

        function getRoleList(tableState) {
            that.roleService.getRoleList().success(function(response) {
                that.isEmpty = response.data.itemList.length === 0;
                tableState.pagination.numberOfPages = response.data.pageCount;
                that.roleDataTable = response.data.itemList;
                that.totalCount = response.data.totalCount;
            });
        }
    }
    Controller.prototype.openRoleModal = function(action, role) {

        var modalInstance = this.$modal.open({
            templateUrl: 'app/role/role-modal/index.html',
            controller: 'RoleModalController as vm',
            resolve: {
                action: function() {
                    return action;
                },
                role: function() {
                    return role;
                },
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/role/role-modal/role-modal.controller.js'
                    ]);
                }]
            }
        });

        modalInstance.result.then(function(data) {

        });
    };


})();