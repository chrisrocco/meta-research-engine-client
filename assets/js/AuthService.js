(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/AuthService', ['exports', 'DataService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('DataService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.DataService);
        global.AuthService = mod.exports;
    }
})(this, function (exports, _DataService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getToken = exports.getUser = exports.logout = exports.register = exports.login = undefined;
    var DataService = babelHelpers.interopRequireWildcard(_DataService);


    function login(email, password, win, fail) {
        DataService.postUsersLogin(email, password).success(function (data) {
            localStorage['api_token'] = data.token;
            localStorage['user'] = JSON.stringify(data.user);
            win();
        }).error(function () {
            fail();
        });
    }

    function register(firstName, lastname, email, password) {
        return DataService.postUsersRegister(firstName, lastname, email, password);
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
