angular.module("app").factory("breadService",["$http","AppConfig",function(e,r){return{get:function(){return e.get("app/bread/bread.json")}}}]);