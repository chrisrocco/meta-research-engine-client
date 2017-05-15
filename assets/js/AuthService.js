(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/AuthService", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.AuthService = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    // const API_BASE_PATH = "http://localhost:8080";
    var API_BASE_PATH = "http://35.184.147.35";
    var TOKEN_PROVIDER = API_BASE_PATH + "/users/login";
    var REGISTER = API_BASE_PATH + "/users/register";

    function login(email, password, win, fail) {
        return $.ajax({
            url: TOKEN_PROVIDER,
            method: "POST",
            data: { "email": email, "password": password },
            dataType: "json"
        }).success(function (data) {
            localStorage['api_token'] = data.token;
            localStorage['user'] = JSON.stringify(data.user);
            win();
        });
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

    function logout() {
        delete localStorage['api_token'];
        delete localStorage['user'];
    }
    function getUser() {
        var json = localStorage['user'];
        return JSON.parse(json);
    }
    function getToken() {
        return localStorage['api_token'];
    }

    exports.login = login;
    exports.register = register;
    exports.logout = logout;
    exports.getUser = getUser;
    exports.getToken = getToken;
});
