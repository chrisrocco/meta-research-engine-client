
angular.module("assignments")
    .controller("AssignmentsController", AssignmentsController);

AssignmentsController.$inject = [ '$scope' ];
function AssignmentsController ( $scope ){
    $scope.tableRows = [];
    init();

    $scope.loadConflictResolution   = loadConflictResolution;
    $scope.loadPaperCoder           = loadPaperCoder;
    $scope.getMoreAssignments       = getMoreAssignments;

    function loadConflictResolution( assignment ){
        localStorage.assignmentKey = assignment._key;
        window.location = "conflict-resolution.html";
    }
    function loadPaperCoder( assignment ){
        localStorage.assignmentKey = assignment._key;
        window.location = "paper-coder.html";
    }
    function getMoreAssignments(){
        var howMany = prompt( "How Many?" );
        var projectkey = prompt( "From Which Project?" );
        var myKey = AuthService.getUser()['_key'];
        var p = DataService.moreAssignmentsPlease( myKey, projectkey, howMany );
        p.success( function( res ){
            console.log( "success adding assignments", res );
        });
        p.error( function ( err ) {
            console.log( "failed adding assignments", err );
        });
    }

    function init(){
        var p = DataService.loadAssignments( AuthService.getUser()['_key'] );
        p.success( function( data ){
            console.log( "loaded data", data );
            $scope.$apply( function(){
                $scope.tableRows = data;
            });

            var activeCount      = 0;
            var completeCount    = 0;
            var conflictCount    = 0;
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var status = row.paper.status;
                switch ( status ){
                    case "active":
                        $scope.activeCount++;
                        break;
                    case "complete":
                        $scope.completeCount++;
                        break;
                    case "conflicted":
                        $scope.conflictCount++;
                        break;
                }
            }
            $scope.$apply( function(){
                $scope.activeCount      = activeCount  ;
                $scope.completeCount    = completeCount;
                $scope.conflictCount    = conflictCount;
            });

        } );
        p.fail( function( err ){
            console.log( "could not load activity", err );
        } );
    }
}