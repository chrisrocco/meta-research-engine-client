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
    "project-center"
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

});