angular.module("assignments")
    .controller("AssignmentsController", AssignmentsController);

AssignmentsController.$inject = [ '$scope' ];
function AssignmentsController ( $scope ){
    $scope.tableRows = [];
    init();

    $scope.loadConflictResolution   = loadConflictResolution;
    $scope.loadPaperCoder           = loadPaperCoder;

    function loadConflictResolution( assignment ){
        localStorage.assignmentKey = assignment._key;
        window.location = "conflict-resolution.html";
    }
    function loadPaperCoder( assignment ){
        localStorage.assignmentKey = assignment._key;
        window.location = "paper-coder.html";
    }
    function init(){
        var p = DataService.loadAssignments( AuthService.getUser()['_key'] );
        p.success( function( data ){
            console.log( "loaded data", data );
            $scope.$apply( function(){
                $scope.tableRows = data;
            });
        } );
        p.fail( function( err ){
            console.log( "could not load activity", err );
        } );
    }
}