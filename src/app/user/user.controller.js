(function() {
    'use strict';
    angular.module('app.user').controller('UserController', Controller);

    Controller.$inject = ['$scope', 'userService'];

    function Controller($scope, userService) {
        var that = this;
        that.isAllSelected = false;
        that.userDataTable = [];
        that.getUserList = getUserList;
        that.totalCount = 0;

        that.isEmpty = false;


        function getUserList(tableState) {

            userService.getUserList().success(function(response) {
                that.isEmpty = response.data.itemList.length === 0;
                tableState.pagination.numberOfPages = response.data.pageCount;
                that.userDataTable = response.data.itemList;
                that.totalCount = response.data.totalCount;
            });
        }
    }

    Controller.prototype.toggleAll = function(){
        var checked = this.isAllSelected;
        angular.forEach(this.userDataTable, function(item) {
            item.selected = checked;
        });
    };

    Controller.prototype.toggle = function() {

        var isAllSelected = true;
        angular.forEach(this.userDataTable, function(item) {
            if (!item.selected) {
                isAllSelected = false;
            }
        });
        this.isAllSelected = isAllSelected;

    };
})();