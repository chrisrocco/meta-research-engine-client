(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/AuthService', ['exports', 'jquery', 'DataService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('DataService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.DataService);
        global.AuthService = mod.exports;
    }
})(this, function (exports, _jquery, _DataService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getToken = exports.getUser = exports.logout = exports.login = undefined;

    var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

    var ds = babelHelpers.interopRequireWildcard(_DataService);
    /**
     * Created by Chris Rocco on 5/10/2017.
     */

    function login(email, password, win, fail) {
        ds.postUsersLogin(email, password).success(function (data) {
            localStorage['api_token'] = data.token;
            localStorage['user'] = JSON.stringify(data.user);
            win();
        }).error(function () {
            fail();
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
    exports.logout = logout;
    exports.getUser = getUser;
    exports.getToken = getToken;
});
