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
    "assignments"
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

});