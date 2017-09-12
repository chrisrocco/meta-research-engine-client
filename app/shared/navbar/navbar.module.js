angular.module("mre.navbar", ['mre.sidebar', 'ui.router'])
    .directive("navbar", function(sidebarService, $state){
        return {
            templateUrl: 'app/shared/navbar/navbar.html',
            controller: function($scope){
                Object.assign($scope, sidebarService);

                $scope.state = $state;
            },
            controllerAs: "sidebarCtrl"
        }
    });