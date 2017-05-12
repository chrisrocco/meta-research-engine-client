(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/DataService", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.DataService = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var API_BASE_PATH = "https://35.184.147.35";

    function postUsersLogin(email, password) {
        return http({
            url: "/users/login",
            method: "POST",
            data: { "email": email, "password": password },
            dataType: "json"
        });
    }

    function postUsersRegister(first_name, last_name, email, password) {
        return http({
            url: "/users/register",
            method: "POST",
            data: {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "password": password
            }
        });
    }

    function getUsersAssignments(id) {
        return http({
            url: "/users/" + id + "/assignments",
            method: "GET",
            dataType: "json"
        });
    }

    function http(config) {
        config['url'] = API_BASE_PATH + config['url'];
        config['headers'] = {
            "Authorization": "Bearer " + "?" // token here
        };
        return $.ajax(config);
    }

    exports.http = http;
    exports.postUsersLogin = postUsersLogin;
    exports.postUsersRegister = postUsersRegister;
    exports.getUsersAssignments = getUsersAssignments;
});
