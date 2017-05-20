(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/AuthService", ["exports", "Config"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("Config"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Config);
        global.AuthService = mod.exports;
    }
})(this, function (exports, _Config) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getToken = exports.getUser = exports.logout = exports.register = exports.login = undefined;
    var Config = babelHelpers.interopRequireWildcard(_Config);


    var TOKEN_PROVIDER = Config.getUrl("login");
    var REGISTER = Config.getUrl("register");

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
        if (!localStorage['user']) return;
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
