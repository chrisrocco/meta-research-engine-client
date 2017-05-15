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
    exports.postProject = exports.getProjectsData = exports.getPaperCoderData = exports.getUsersAssignments = exports.putAssignment = exports.getAssignment = exports.http = undefined;
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    var API_BASE_PATH = "https://coursebooks.xyz";
    // const API_BASE_PATH = "http://localhost:8080";

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

    function putAssignment(assignmentObject) {
        return http({
            url: "/assignments/" + assignmentObject._key,
            method: "PUT",
            data: {
                "done": assignmentObject.done,
                "completion": assignmentObject.completion,
                "encoding": assignmentObject.encoding
            }
        });
    }

    function getPaperCoderData(assignmentKey) {
        return http({
            url: "/loadAssignment?key=" + assignmentKey,
            method: "GET",
            dataType: "json"
        });
    }

    function getProjectsData() {
        return http({
            url: "/loadProjects",
            method: "GET",
            dataType: "json"
        });
    }

    function postProject(projectObject) {
        return http({
            url: "/studies",
            method: "POST",
            data: projectObject,
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
    exports.putAssignment = putAssignment;
    exports.getUsersAssignments = getUsersAssignments;
    exports.getPaperCoderData = getPaperCoderData;
    exports.getProjectsData = getProjectsData;
    exports.postProject = postProject;
});