angular.module("app.role").config(["$stateProvider",function(e){e.state("app.role",{url:"/role",templateUrl:"app/role/index.html",resolve:{load:["$ocLazyLoad",function(e){return e.load(["app/role/role.controller.js","app/role/role.service.js","app/shared/status/status.filter.js"])}]}})}]);