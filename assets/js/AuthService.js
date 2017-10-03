(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/AuthService", ["exports", "src/es/URLs"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("src/es/URLs"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.URLs);
        global.AuthService = mod.exports;
    }
})(this, function (exports, _URLs) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getToken = exports.getUser = exports.isLoggedIn = exports.logout = exports.renew = exports.register = exports.login = undefined;

    var TOKEN_PROVIDER = window._env.loginURL;
    var REGISTER = window._env.registerURL;
    var RENEW = window._env.renewURL;

    function login(email, password) {
        var p = $.ajax({
            url: TOKEN_PROVIDER,
            method: "POST",
            data: { "email": email, "password": password },
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

    exports.login = login;
    exports.register = register;
    exports.renew = renew;
    exports.logout = logout;
    exports.isLoggedIn = isLoggedIn;
    exports.getUser = getUser;
    exports.getToken = getToken;
});
