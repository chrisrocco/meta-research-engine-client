(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/DataService', ['exports', 'URLs', 'AuthService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('URLs'), require('AuthService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.URLs, global.AuthService);
        global.DataService = mod.exports;
    }
})(this, function (exports, _URLs, _AuthService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.defaulthost = exports.localhost = exports.uploadPapersCSV = exports.postResetPassword = exports.postForgotPassword = exports.postProjectEnrollments = exports.postProjectStructure = exports.getProjectBuilderData = exports.postProject = exports.getProjectsData = exports.getUsersAssignments = exports.putAssignment = exports.getAssignment = exports.http = exports.loadConflictResolution = exports.loadAssignments = exports.loadCodeBook = exports.loadPaperCoder = exports.loadManageProject = undefined;
    var URLs = babelHelpers.interopRequireWildcard(_URLs);
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    var API_BASE_PATH = URLs.getUrl('api');
    if (localStorage.hostOverride) {
        API_BASE_PATH = localStorage.hostOverride;
    }

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
        }).complete(function (res) {
            console.log("put assignment response", res);
        });
    }
    function loadPaperCoder(assignmentKey) {
        return http({
            url: "/loadPaperCoder?key=" + assignmentKey,
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
    function getProjectBuilderData(projectKey) {
        return http({
            url: "/loadProjectBuilder",
            method: "GET",
            data: {
                'projectKey': projectKey
            },
            dataType: "json"
        });
    }
    function postProjectStructure(projectKey, structure) {
        return http({
            url: "/projects/" + projectKey + "/structure",
            method: "POST",
            data: structure
        });
    }
    function loadCodeBook() {
        return http({
            url: "/loadCodeBook",
            method: "GET",
            dataType: "json"
        });
    }
    function postProject(projectObject) {
        return http({
            url: "/projects",
            method: "POST",
            data: projectObject,
            dataType: "json"
        });
    }
    function postProjectEnrollments(registrationCode, userKey) {
        return http({
            url: "/projects/members",
            method: "POST",
            data: {
                "userKey": userKey,
                "registrationCode": registrationCode
            },
            dataType: "json"
        });
    }
    function postForgotPassword(email) {
        return http({
            url: "/users/recover",
            method: "POST",
            data: {
                "email": email,
                "callback": URLs.getUrl("resetPasswordCallback")
            }
        });
    }
    function postResetPassword(newPassword, hash_code) {
        return http({
            url: "/users/reset",
            method: "POST",
            data: {
                "hash_code": hash_code,
                "newPassword": newPassword
            }
        });
    }
    function loadAssignments() {
        return http({
            url: "/loadAssignments" + "?userKey=" + AuthService.getUser()._key,
            method: "GET",
            dataType: "json"
        });
    }
    function loadManageProject(projectKey) {
        return http({
            url: "/loadManageProject" + "?projectKey=" + projectKey,
            method: "GET",
            dataType: "json"
        });
    }
    function loadConflictResolution(assignmentKey) {
        return http({
            url: "/loadConflictResolution" + "?assignmentKey=" + assignmentKey,
            method: "GET",
            dataType: "json"
        });
    }
    function uploadPapersCSV(projectKey, formData) {
        return http({
            url: "/projects/" + projectKey + "/papers",
            method: "POST",
            data: formData,
            dataType: "json",
            processData: false,
            contentType: false
        });
    }
    function http(config) {
        config['url'] = API_BASE_PATH + config['url'];
        config['headers'] = {
            "Authorization": "Bearer " + AuthService.getToken // token here
            () };
        return $.ajax(config);
    }
    /* Development */
    function localhost() {
        localStorage.hostOverride = "http://localhost:8080";
        window.location.reload();
    }
    function defaulthost() {
        delete localStorage.hostOverride;
        window.location.reload();
    }

    exports.loadManageProject = loadManageProject;
    exports.loadPaperCoder = loadPaperCoder;
    exports.loadCodeBook = loadCodeBook;
    exports.loadAssignments = loadAssignments;
    exports.loadConflictResolution = loadConflictResolution;
    exports.http = http;
    exports.getAssignment = getAssignment;
    exports.putAssignment = putAssignment;
    exports.getUsersAssignments = getUsersAssignments;
    exports.getProjectsData = getProjectsData;
    exports.postProject = postProject;
    exports.getProjectBuilderData = getProjectBuilderData;
    exports.postProjectStructure = postProjectStructure;
    exports.postProjectEnrollments = postProjectEnrollments;
    exports.postForgotPassword = postForgotPassword;
    exports.postResetPassword = postResetPassword;
    exports.uploadPapersCSV = uploadPapersCSV;
    exports.localhost = localhost;
    exports.defaulthost = defaulthost;
});
