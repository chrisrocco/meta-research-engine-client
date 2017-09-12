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
    "manage-project"
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
            controller: "ProjectBuilderController"
        })
        .state('project-manage', {
            url: '/project-manage',
            templateUrl: "app/manage-project/project-manage.html",
            controller: "ManageProjectController"
        })

});