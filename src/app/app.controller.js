(function() {
	'use strict';
	angular.module('app').controller('AppController', Controller);

	Controller.$inject = ['$rootScope', '$scope', '$state', 'bread'];

	function Controller($rootScope, $scope, $state, bread) {

		var that = this;
		that.breadcrumb = [];

		var crumb = {};
		(function flatten(a, dest) {
			var i = 0,
				j = a.length;
			for (; i < j; i++) {
				dest[a[i].alias || a[i].href] = a[i];
				if (a[i].children && a[i].children.length > 0) {
					flatten(a[i].children, dest);
				}
			}
		})(bread, crumb);

		$scope.$on('$stateChangeSuccess', function() {

			that.breadcrumb = [];
			var current = $state.$current.name,
				states = current.split('.'),
				i = 2,
				j = states.length;
			for (; i <= j; i++) {
				var stateItem = states.slice(0, i).join('.');
				if (crumb[stateItem]) {
					$rootScope.title = crumb[stateItem].title;
					that.breadcrumb.push(crumb[stateItem]);
				}
			}
			if (current.indexOf('app.home') !== 0 && crumb['app.home']) {
				that.breadcrumb.unshift(crumb['app.home']);
			}
		});
	}
})();