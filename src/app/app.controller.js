(function() {
	'use strict';
	angular.module('app').controller('AppController', Controller);

	Controller.$injector = ['$rootScope', '$scope', '$state', 'bread'];

	function Controller($rootScope, $scope, $state, bread) {

		var vm = this;
		vm.breadcrumb = [];

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

			vm.breadcrumb = [];
			var current = $state.$current.name,
				states = current.split('.'),
				i = 2,
				j = states.length;
			for (; i <= j; i++) {
				var stateItem = states.slice(0, i).join('.');
				if (crumb[stateItem]) {
					$rootScope.title = crumb[stateItem].title;
					vm.breadcrumb.push(crumb[stateItem]);
				}
			}
			if (current.indexOf('app.home') !== 0) {
				vm.breadcrumb.unshift(crumb['app.home']);
			}
		});
	}
})();