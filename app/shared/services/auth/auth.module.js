angular.module("mre.auth", [])
    .factory("authService", function(){
        return window.AuthService;
    });

function makeAuthService() {

    let TOKEN_PROVIDER = window._env.loginURL;
    let REGISTER = window._env.registerURL;
    let RENEW = window._env.renewURL;

    function login(email, password) {
        var p = $.ajax({
            url: TOKEN_PROVIDER,
            method: "POST",
            data: {"email": email, "password": password},
            dataType: "json"
        });
        p.success(function (data) {
            localStorage['api_token'] = data.token;
            localStorage['user'] = JSON.stringify(data.user);
        });
        return p;
    }

    function register(firstName, lastName, email, password) {
        return $.ajax({
            url: REGISTER,
            method: "POST",
            data: {
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "password": password
            }
        });
    }

    function renew() {
        $.ajax({
            url: RENEW,
            headers: {
                Authorization: "Bearer " + getToken()
            },
            method: "POST",
            dataType: "json"
        }).success(function (res) {
            localStorage['api_token'] = res.token;
        });
    }

    function logout() {
        delete localStorage['api_token'];
        // delete localStorage['user'];
    }

    function getUser() {
        if (!localStorage['user']) throw 'Tried to access user details when they were not logged in!';
        var json = localStorage['user'];
        return JSON.parse(json);
    }

    function isLoggedIn() {
        if (localStorage['user'] && localStorage['api_token']) return true;
        return false;
    }

    function getToken() {
        return localStorage['api_token'];
    }

    let authService = {login, register, renew, logout, getUser, isLoggedIn, getToken};
    window.AuthService = authService;
    return authService;
}
window.AuthService = makeAuthService();