angular.module("assignments")
    .controller("AssignmentsController", AssignmentsController);

AssignmentsController.$inject = [ '$scope' ];
function AssignmentsController ( $scope ){
    $scope.test = "Success";
}