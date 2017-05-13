(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("/DataService", ["exports", "AuthService"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("AuthService"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.AuthService);
        global.DataService = mod.exports;
    }
})(this, function (exports, _AuthService) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getUsersAssignments = exports.getAssignment = exports.http = undefined;
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    var API_BASE_PATH = "http://35.184.147.35";

    function getUsersAssignments(id) {
        return http({
            url: "/users/" + id + "/assignments",
            method: "GET",
            dataType: "json"
        });
    }

    function getAssignment(key) {
        return http({
            url: "/assignments/" + key,
            method: "GET",
            dataType: "json"
        });
    }

    function http(config) {
        config['url'] = API_BASE_PATH + config['url'];
        config['headers'] = {
            "Authorization": "Bearer " + AuthService.getToken() // token here
        };
        return $.ajax(config);
    }

    exports.http = http;
    exports.getAssignment = getAssignment;
    exports.getUsersAssignments = getUsersAssignments;
});
