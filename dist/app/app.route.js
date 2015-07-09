angular.module("app").config(["$provide","$stateProvider","$urlRouterProvider",function(e,t,n){n.otherwise("/"),t.state("app",{"abstract":!0,templateUrl:"app/index.html",resolve:{loadCss:["$ocLazyLoad","AppConfig",function(e,t){return e.load(["assets/theme/"+t.theme+"/css/bootstrap.min.css","assets/theme/"+t.theme+"/css/style.min.css"])}],status:["$ocLazyLoad","$injector",function(t,n){return t.load(["app/shared/status/status.service.js"]).then(function(){return n.get("statusService").get().then(function(t){return e.constant("Status",t)})})}],nav:["$ocLazyLoad","$injector",function(e,t){return e.load("app/nav/nav.service.js").then(function(){return t.get("navService").getNav()})}],currentUser:["$ocLazyLoad","$injector",function(e,t){return e.load("app/user/user.service.js").then(function(){return t.get("userService").getCurrentUser()})}],load:["$ocLazyLoad","AppConfig",function(e,t){return e.load(["app/components/menu/menu.directive.js"])}]},controller:["$rootScope","$scope","$state","nav","currentUser",function(e,t,n,r,a){t.nav=r,e.currentUser=a;var o={};!function(e,t){for(var n=0,r=e.length;r>n;n++)t[e[n].alias||e[n].href]=e[n],e[n].children&&e[n].children.length>0&&arguments.callee(e[n].children,t)}(r,o),t.$on("$stateChangeSuccess",function(){e.breadcrumb=[];for(var r=n.$current.name,a=r.split("."),s=2,c=a.length;c>=s;s++){var u=a.slice(0,s).join(".");o[u]&&(e.title=t.title=o[u].title,e.breadcrumb.push(o[u]))}0!==r.indexOf("app.home")&&e.breadcrumb.unshift(o["app.home"])})}]})}]);