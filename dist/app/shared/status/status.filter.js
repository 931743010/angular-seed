angular.module("app.filters").filter("status",["Status",function(a){return function(t){var u="-";return angular.forEach(a,function(a){a.value===t&&(u=a.displayName)}),u}}]);