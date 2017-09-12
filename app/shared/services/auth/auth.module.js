angular.module("mre.auth", [])
    .factory("authService", function(){
        return window.AuthService;
    });