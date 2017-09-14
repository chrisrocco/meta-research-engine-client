angular.module("mre.navbar", ['mre.sidebar'])
    .directive("navbar", function(sidebarService){
        return {
            templateUrl: 'app/shared/navbar/navbar.html',
            controller: function($scope, $state){
                $scope.sidebar = sidebarService;
                $scope.$state = $state;



                $scope.joinStudy = joinStudy;
                $scope.logout = logout;
                //=============================================
                function joinStudy(){
                    ApplicationService.joinStudy();
                }
                function logout(){
                    AuthService.logout();
                    $state.go("auth.login");
                }
            },
            controllerAs: "sidebarCtrl"
        }
    });