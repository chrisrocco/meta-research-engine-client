(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/DataService', ['exports', 'src/es/URLs', 'AuthService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('src/es/URLs'), require('AuthService'));
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
    exports.forkProject = exports.moreAssignmentsPlease = exports.handleUnauthorized = exports.reportError = exports.makeProjectOwner = exports.uploadPapersByID = exports.uploadPapersCSV = exports.postResetPassword = exports.postForgotPassword = exports.postProjectEnrollments = exports.postProjectStructure = exports.getProjectBuilderData = exports.postProject = exports.getProjectsData = exports.getUsersAssignments = exports.putAssignment = exports.getAssignment = exports.http = exports.loadReport = exports.loadConflictResolution = exports.loadAssignments = exports.loadCodeBook = exports.loadPaperCoder = exports.loadManageProject = undefined;
    var URLs = babelHelpers.interopRequireWildcard(_URLs);
    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);


    // var API_BASE_PATH = URLs.getUrl('api');
    var API_BASE_PATH = window._env.serverURL;

    function forkProject(projectKey, newName, newDescription) {
        return http({
            url: "/projects/" + projectKey + "/fork",
            method: "POST",
            data: {
                name: newName,
                description: newDescription
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
    function getAssignment(key) {
        return http({
            url: "/assignments/" + key,
            method: "GET",
            dataType: "json"
        });
    }
    function putAssignment(assignmentObject, async) {
        if (async == 'undefined') async = true;
        return http({
            url: "/assignments/" + assignmentObject._key,
            method: "PUT",
            async: async,
            data: {
                "done": assignmentObject.done,
                "completion": assignmentObject.completion,
                "encoding": assignmentObject.encoding
            }
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
    function loadReport(paperKey) {
        return http({
            url: "/activities/report" + "?paperKey=" + paperKey,
            method: "GET",
            dataType: "json"
        });
    }
    function uploadPapersCSV(projectKey, formData) {
        return http({
            url: "/projects/" + projectKey + "/papers",
            method: "POST",
            data: formData,
            dataType: "json"
        });
    }
    function uploadPapersByID(projectKey, pmcIDs) {
        return http({
            url: "/projects/" + projectKey + "/papers/byPMCID",
            method: "POST",
            data: {
                "pmcIDs": pmcIDs
            },
            dataType: "json"
        });
    }
    function moreAssignmentsPlease(userKey, projectKey, howMany) {
        return http({
            url: "/moreAssignmentsPlease",
            method: "POST",
            data: {
                userKey: userKey,
                projectKey: projectKey,
                howMany: howMany
            }
        });
    }
    function makeProjectOwner(projectKey, otherUserEmail) {
        return http({
            url: "/projects/" + projectKey + "/makeOwner",
            method: "POST",
            data: {
                "userEmail": otherUserEmail
            },
            dataType: "json"
        });
    }
    function http(config) {
        config['url'] = API_BASE_PATH + config['url'];
        config['headers'] = {
            "Authorization": "Bearer " + AuthService.getToken() // token here
        };
        config['statusCode'] = {
            500: reportError,
            401: handleUnauthorized
        };
        return $.ajax(config).complete(function (res) {
            AuthService.renew();
        });
    }

    function reportError(err) {
        var report = {};
        if (err.responseJSON) report = err.responseJSON;else if (err.responseText) report = err.responseText;else report = JSON.stringify(err);

        var activity = window.location.href;

        console.log("generating error report", err);
        $.ajax({
            url: API_BASE_PATH + "/reportError",
            type: "POST",
            data: {
                "activity": activity,
                "error": report
            }
        }).complete(function (res) {
            console.log("sent error report", res);
        });
    }
    function handleUnauthorized(err) {
        // The server is not appending the 'Access-Control-Allow-Origin' header into the response, preventing me from reading the status code.
        // window.location = window.location.hostname;
        alert("Your session has expired. Please login again.");
    }

    exports.loadManageProject = loadManageProject;
    exports.loadPaperCoder = loadPaperCoder;
    exports.loadCodeBook = loadCodeBook;
    exports.loadAssignments = loadAssignments;
    exports.loadConflictResolution = loadConflictResolution;
    exports.loadReport = loadReport;
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
    exports.uploadPapersByID = uploadPapersByID;
    exports.makeProjectOwner = makeProjectOwner;
    exports.reportError = reportError;
    exports.handleUnauthorized = handleUnauthorized;
    exports.moreAssignmentsPlease = moreAssignmentsPlease;
    exports.forkProject = forkProject;
});
