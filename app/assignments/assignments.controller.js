angular.module("assignments")
    .controller("AssignmentsController", AssignmentsController);

AssignmentsController.$inject = [ '$scope' ];
function AssignmentsController ( $scope ){
    $scope.tableRows = [];
    init();

    function init(){
        var p = DataService.loadAssignments( AuthService.getUser()['_key'] );
        p.success( function( data ){

        } );
        p.fail( console.log("server error") );
    }
}