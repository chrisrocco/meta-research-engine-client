angular
    .module('report')
    .controller('ReportController', ReportController);

function ReportController( $scope ) {
    init();
    $scope.paper = null;

    function init() {
        var p = DataService.loadConflictResolution( localStorage.assignmentKey );
        p.success( function( data ){
            $scope.$apply( function(){
                $scope.paper = data.paper;
            });
            console.log( "loaded paper: ", $scope.paper );
        });
        p.error( function( err ){
            console.log( "error loading activity: ", err );
        });
    }
}