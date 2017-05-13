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
    var TOKEN_PROVIDER = "http://35.184.147.35/users/login";

    function login(email, password, win, fail) {
        $.ajax({
            url: TOKEN_PROVIDER,
            method: "POST",
            data: { "email": email, "password": password },
            dataType: "json"
        }).success(function (data) {
            localStorage['api_token'] = data.token;
            localStorage['user'] = JSON.stringify(data.user);
            win();
        }).error(function () {
            fail();
        });
    }

    function register(firstName, lastName, email, password) {
        return $.ajax({
            url: "/users/register",
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
