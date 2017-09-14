
angular.module("mre")
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/assignments');

        $stateProvider
            .state('assignments', {
                url: '/assignments',
                templateUrl: "app/assignments/assignments.html",
                controller: "AssignmentsController",
                controllerAs: "assCtrl",
                onEnter: function(){
                    $("body").attr("class", "app-work");
                }
            })
            .state('paper-coder', {
                url: '/paper-coder',
                templateUrl: "app/paper-coder/paper-coder.html",
                controller: "PaperCoderController",
                onEnter: function () {
                    $("body").attr("class", "");
                }
            })
            .state('project-center', {
                url: '/project-center',
                templateUrl: "app/project-center/project-center.html",
                controller: "ProjectCenterController",
                onEnter: function(){
                    $("body").attr("class", "app-projects");
                }
            })
            .state('project-builder', {
                url: '/project-builder',
                templateUrl: "app/project-builder/project-builder.html",
                controller: "ProjectBuilderController",
                onEnter: function () {
                    $("body").attr("class", "");
                }
            })
            .state('project-manage', {
                url: '/project-manage',
                templateUrl: "app/manage-project/project-manage.html",
                controller: "ManageProjectController",
                onEnter: function () {
                    $("body").attr("class", "");
                }
            })
            .state('codebook', {
                url: '/codebook',
                templateUrl: "app/codebook/codebook.html",
                controller: "CodebookController",
                onEnter: function(){
                    $("body").attr("class", "page-faq")
                }
            })
            .state("auth", {
                url: "/auth",
                templateUrl: "app/auth/auth.html",
                controller: "authController",
                onEnter: function(){
                    $("body").attr("class", "page-login-v3 layout-full");
                }
            })
            .state("auth.login", {
                url: "/login",
                templateUrl: "app/auth/_login.html",
                hideNavbar: true
            })
            .state("auth.register", {
                url: "/register",
                templateUrl: "app/auth/_register.html",
                hideNavbar: true
            })
            .state("forgot-password", {
                url: "/forgot-password",
                templateUrl: "app/forgot-password/forgot-password.html",
                controller: "forgotPasswordController",
                hideNavbar: true,
                onEnter: function(){
                    $("body").attr("class", "page-forgot-password layout-full");
                }
            })
            .state("resetPassword", {
                url: "/resetPassword",
                templateUrl: "app/resetPassword/resetPassword.html",
                controller: "resetPasswordController",
                hideNavbar: true,
                onEnter: function(){
                    $("body").attr("class", "");
                }
            })
            .state("report", {
                url: "/report",
                templateUrl: "app/report/report.html",
                controller: "ReportController",
                onEnter: function(){
                    $("body").attr("class", "");
                }
            })

    });