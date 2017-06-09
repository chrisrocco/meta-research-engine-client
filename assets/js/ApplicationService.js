(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('/ApplicationService', ['exports', 'jquery', 'AuthService', 'DataService'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('AuthService'), require('DataService'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jQuery, global.AuthService, global.DataService);
        global.ApplicationService = mod.exports;
    }
})(this, function (exports, _jquery, _AuthService, _DataService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.renderSession = exports.joinStudy = undefined;

    var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

    var AuthService = babelHelpers.interopRequireWildcard(_AuthService);
    var DataService = babelHelpers.interopRequireWildcard(_DataService);


    var emailSelector = ".bdEmail";
    var firstNameSelector = ".bdFirstName";
    var lastNameSelector = ".bdLastName";

    var managerOnlySelector = ".bdManagerOnly";

    function joinStudy() {
        var userKey = AuthService.getUser()._key;

        swal({
            title: "Join Project!",
            text: "Enter a registration code:",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Ask your project manager",
            showLoaderOnConfirm: true
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false;
            }
            var promise = DataService.postProjectEnrollments(inputValue, userKey);
            promise.success(function (res) {
                var projectName = res.studyName;
                swal({
                    title: "Success!",
                    text: "You have joined " + projectName,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                console.log("Success", res);
            });
            promise.fail(function (res) {
                console.log("Fail", res);

                if (res.status === 409) {
                    swal({
                        title: "Wait a Minute!",
                        text: "You're already in that study",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    });
                    return;
                }
                if (res.status === 404) {
                    swal({
                        title: "Invalid Code",
                        text: "That doesn't look like an active registration code!",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    });
                    return;
                }

                swal({
                    title: "Opps...",
                    text: "Something went wrong.",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
            });
        });
    }

    function renderSession() {
        (0, _jquery2.default)(managerOnlySelector).hide();
        var user = AuthService.getUser();
        if (!user) {
            return;
        }

        (0, _jquery2.default)(emailSelector).html(user.email);
        (0, _jquery2.default)(firstNameSelector).html(user.first_name);
        (0, _jquery2.default)(lastNameSelector).html(user.last_name);
        if (user.role === "manager") {
            (0, _jquery2.default)(managerOnlySelector).show();
        }
    }

    exports.joinStudy = joinStudy;
    exports.renderSession = renderSession;
});
