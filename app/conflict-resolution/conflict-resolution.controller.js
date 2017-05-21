angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = [ '$scope', 'transaction.service' ];
function ConflictResolutionController( $scope, TransactionService ){
    $scope.assignment       =   defaultModel.assignment;
    $scope.paper            =   defaultModel.paper;
    $scope.collaborators    =   defaultModel.collaborators;
    $scope.userKey          =   AuthService.getUser()._key;
    init();

    function init() {
        var p = DataService.loadConflictResolution( localStorage.assignmentKey );
        p.success( function( data ){

            $scope.$apply( function(){
                $scope.assignment = data.assignment;
                $scope.paper = data.paper;
                $scope.collaborators = data.collaborators;
            });
            TransactionService.startTransaction( $scope.assignment );

            console.log( "loaded activity: ", data );
        });
        p.fail( function( err ){
            console.log( "error loading activity: ", err );
        });
    }
}

var defaultModel = {
    "assignment": {},
    "paper": {
        title: "Loading..."
    },
    "collaborators": []
};