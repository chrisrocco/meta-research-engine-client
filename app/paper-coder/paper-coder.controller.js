angular
    .module("paper-coder")
    .controller("PaperCoderController", PaperCoderController);

PaperCoderController.$inject = ['$scope', '$sce', 'paper-coder.service'];
function PaperCoderController($scope, $sce, paperCoderService) {
    // setup default models
    $scope.assignment = paperCoderService.getAssignment();
    $scope.structure = [];
    // functions
    $scope.newBranch = paperCoderService.newBranch;
    $scope.calculateCompletion = paperCoderService.calculateCompletion;
    $scope.toggleComplete = function(){
        paperCoderService.toggleComplete();
        DataService.putAssignment( $scope.assignment );
    };
    $scope.save = function( silent ){
        if( silent === true ){

        } else {
            swal({
                title: "Saving...",
                text: "Just a sec!",
                type: "info",
                showCancelButton: true,
                showConfirmButton: false,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            });
        }


        var p = DataService.putAssignment( $scope.assignment );
        p.success( function( res ){

            swal({
                title: "Work Saved!",
                text: "Your work has been uploaded to the database!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        });
        p.error( function( err ){
            swal({
                title: "Opps..",
                text: "Something went wrong :(",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-error",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });

        })
    };
    $scope.popOut = function( paperObject ){
        window.open( paperObject.url,
            "Research Coder | "+paperObject.title,
            "height=700,width=500"
        );
    };
    $scope.nextAssignment = function(){
        if( !localStorage.nextAssignment ) throw "Next Assignment is not set!";
    };

    var p = DataService.loadPaperCoder( localStorage.assignmentKey );
    p.success( function(data){


        /* Initialize Data */
        data.assignment.completion = parseFloat( data.assignment.completion );

        // NULL encoding? -> Initialize a blank one: add all project questions in the assignment's encoding. load the structure into activity as a global.
        if( data.assignment.encoding == null || data.assignment.encoding == "" ){
            var encoding = {
                constants: [],
                branches: [[]]
            };
            addToAssignment( encoding, data.questions );
            data.assignment.encoding = encoding;

        }

        // If constants property was removed during the encoding / decoding
        if( !data.assignment.encoding.constants ){
            data.assignment.encoding.constants = [];
        }
        // If branches property was removed during encoding / decoding
        if( !data.assignment.encoding.branches){
            data.assignment.encoding.branches = [[]];
        }

        // Because there might be new questions
        addToAssignment( data.assignment.encoding, data.questions );

        /* Allows loading outside resources into iframe with angular */
        data.paper.url = $sce.trustAsResourceUrl(data.paper.url);
        // Hook into angular digest cycle
        $scope.$apply( function(){
            $scope.paper = data.paper;
            $scope.assignment = data.assignment;
            $scope.structure = data.structure;
            paperCoderService.loadAssignment( $scope.assignment );
        });
        // reseting the assignment
        $scope.nullify = function (){
            $scope.assignment.encoding = null;
            $scope.save();
            window.location.reload();
        }
    });
    $( window ).unload(function() {
        DataService.putAssignment( $scope.assignment, false );
    });

    // adds questions from project into an encoding branch IF they are not already there.
    function addToAssignment( encoding, questionsArray ){
        for( var i = 0; i < questionsArray.length; i++ ){
            var qKey = questionsArray[i]['_key'];
            var existsInEncoding = false;
            // in constants?
            if( paperCoderService.branchContains( encoding.constants, qKey ) ) existsInEncoding = true;
            // in branches?
            encoding.branches.forEach( function( branch ){
                if( paperCoderService.branchContains( branch, qKey ) ) existsInEncoding = true;
            });

            if( existsInEncoding == false ){
                var input = {
                    question: qKey,
                    data: {
                        dont_flatten_me: ""
                    }
                };
                encoding.constants.push( input );
            }

        }
    }
}