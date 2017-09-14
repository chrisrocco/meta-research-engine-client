angular
    .module('report')
    .controller('ReportController', ReportController);

function ReportController( $scope ) {
    init();
    $scope.paper = null;

    function init() {
        var p = DataService.loadReport( localStorage.paperKey );
        p.success( function( data ){
            $scope.$apply( function(){
                $scope.paper = data.paper;
            });

        });
        p.error( function( err ){

        });
    }
}