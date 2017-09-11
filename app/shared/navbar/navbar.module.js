angular.module("mre.navbar", ['mre.sidebar'])
    .directive("navbar", function(sidebarService){
        return {
            templateUrl: 'app/shared/navbar/navbar.html',
            controller: function($scope){
                window.sbs = sidebarService;
                Object.assign($scope, sidebarService);
            },
            controllerAs: "sidebarCtrl"
        }
    });