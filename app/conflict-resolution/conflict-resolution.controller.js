angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = [ '$scope', '$sce', 'transaction.service' ];
function ConflictResolutionController( $scope, $sce, TransactionService ){
    $scope.assignment       =   defaultModel.assignment;
    $scope.paper            =   defaultModel.paper;
    $scope.collaborators    =   defaultModel.collaborators;
    init();

    $scope.isMyResponse     =   isMyResponse;
    $scope.iAgree           =   function( question, response ){
        console.log( "user (assignment key) ", $scope.assignment._key, " wants to change his answer on ", question, " to agree with ", response );
        TransactionService.addTransaction( question._key, response.data );

        swal({
            title: "Change your Response!?",
            text: "#bandwagon",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function(){
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
                }, function(){
                    window.location.reload();
                });
            });
        });
    };

    function isMyResponse( response ){
        return response.users.indexOf( $scope.assignment._key ) >= 0;
    }
    function init() {
        var p = DataService.loadConflictResolution( localStorage.assignmentKey );
        p.success( function( data ){
            if( data.paper.status != "conflicted" ){
                window.location = "assignments.html";
            }

            $scope.$apply( function(){
                $scope.assignment = data.assignment;
                /* Trust Paper URL */
                data.paper.url = $sce.trustAsResourceUrl(data.paper.url);
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


    $scope.popOut = function( paperObject ){
        window.open( paperObject.url,
            "Research Coder | "+paperObject.title,
            "height=700,width=500"
        );
    };
}

var defaultModel = {
    "assignment": {},
    "paper": {
        title: "Loading..."
    },
    "collaborators": []
};