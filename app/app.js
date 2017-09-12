let app = angular.module("mre", [
    /* external */
    "ui.router",
    /* services */
    "mre.auth",
    /* shared */
    "mre.sidebar",
    "mre.navbar",
    "mre.footer",
    /* pages */
    "assignments",
    "project-center",
    "project-builder",
    "manage-project",
    "codebook",
    "paper-coder"
]);

app.config(function($stateProvider, $urlRouterProvider) {

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
        .state("login", {
            url: "/login",
            templateUrl: "app/login/login.html",
            controller: "loginController"
        })

});