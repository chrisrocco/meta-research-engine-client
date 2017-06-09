
angular.module("assignments")
    .controller("AssignmentsController", AssignmentsController);

AssignmentsController.$inject = [ '$scope' ];
function AssignmentsController ( $scope ){
    $scope.tableRows = [];
    $scope.myProjects = DEFAULT_MODELS.myProjects;
    $scope.assignFromProject = $scope.myProjects[0];
    $scope.howManyAssignments = 1;
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
    function getMoreAssignments( confirm ){
        if( confirm === true ){
            var myKey = AuthService.getUser()._key;
            var howMany = $scope.howManyAssignments;
            var projectKey = $scope.assignFromProject._key;
            console.log( myKey, howMany, projectKey );
            var p = DataService.moreAssignmentsPlease( myKey, projectKey, howMany );
            p.success( function( res ){
                swal({
                    title: "Success!",
                    text: "Keep up the good work!",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                }, function(){
                    window.location.reload();
                });
            });
            p.error( function ( err ) {
                swal({
                    title: "Opps...",
                    text: "Something went wrong.",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
            });
        }
        // getMyEnrollments
        $("#moreAssignmentsModal").modal("show");
    }

    function init(){
        var p = DataService.loadAssignments( AuthService.getUser()['_key'] );
        p.success( function( data ){
            console.log( "loaded data", data );
            data = data[0];
            $scope.$apply( function(){
                $scope.tableRows = data.assignments;
                $scope.myProjects = data.projects;
                if( $scope.myProjects.length > 0 ){
                    $scope.assignFromProject = $scope.myProjects[0];
                }
            });

            var activeCount      = 0;
            var completeCount    = 0;
            var conflictCount    = 0;
            for (var i = 0; i < data.assignments.length; i++) {
                var row = data.assignments[i];
                var status = row.paper.status;
                switch ( status ){
                    case "active":
                        activeCount++;
                        break;
                    case "complete":
                        completeCount++;
                        break;
                    case "conflicted":
                        conflictCount++;
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

const DEFAULT_MODELS = {
    myProjects: [
        {
            "_key": 123,
            "name": "Loading Projects..."
        }
    ]
};