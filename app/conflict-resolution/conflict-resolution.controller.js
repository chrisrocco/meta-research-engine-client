angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = [ '$scope' ];
function ConflictResolutionController( $scope ){
    $scope.assignment       =   defaultModel.assignment;
    $scope.paper            =   defaultModel.paper;
    $scope.collaborators    =   defaultModel.collaborators;
    $scope.userKey          =   AuthService.getUser()._key;
    init();

    function init() {
        var p = DataService.loadConflictResolution( localStorage.assignmentKey );
        p.success( function( data ){
            console.log( "loaded activity: ", data );
        });
        p.fail( function( err ){
            console.log( "error loading activity: ", err );
        });
    }
}

var defaultModel = {
    "assignment": {},
    "paper": {},
    "collaborators": []
};