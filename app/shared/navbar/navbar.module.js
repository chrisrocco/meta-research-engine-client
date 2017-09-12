angular.module("mre.navbar", ['mre.sidebar'])
    .directive("navbar", function(sidebarService){
        return {
            templateUrl: 'app/shared/navbar/navbar.html',
            controller: function($scope){
                $scope.sidebar = sidebarService;
            },
            controllerAs: "sidebarCtrl"
        }
    });