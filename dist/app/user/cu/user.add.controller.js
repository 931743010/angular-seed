angular.module("app.user.cu").controller("UserAddController",["$scope","userService",function(s,u){var e=this;e.isSubmitting=!1,e.userName=null,e.realName=null,e.password=null,e.passwordConfirm=null,e.add=function(){e.isSubmitting=!0,u.add(e.userName,e.fullName,e.password).success(function(u){e.isSubmitting=!1,u.success&&s.$state.go("^")})}}]);