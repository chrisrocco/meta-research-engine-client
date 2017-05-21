angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = [ '$scope', 'transaction.service' ];
function ConflictResolutionController( $scope, TransactionService ){
    $scope.assignment       =   defaultModel.assignment;
    $scope.paper            =   defaultModel.paper;
    $scope.collaborators    =   defaultModel.collaborators;
    init();

    $scope.isMyResponse     =   isMyResponse;
    $scope.iAgree           =   function( question, response ){
        console.log( "user (assignment key) ", $scope.assignment._key, " wants to change his answer on ", question, " to agree with ", response );
        TransactionService.addTransaction( question._key, response.data );

        // TODO - dont immediately resolve
        console.log( "before resolve", $scope.assignment );
        TransactionService.resolve();
        console.log( "after resolve", $scope.assignment );
        DataService.putAssignment( $scope.assignment ).then( function(res){
            console.log( "from server: ", res);
            swal({
                title: "All Good!",
                text: "Your assignment has been updated with the new response!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        })
    };

    function isMyResponse( response ){
        return response.users.indexOf( $scope.assignment._key ) >= 0;
    }
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