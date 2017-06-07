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
        if( $scope.assignment.done == true ){
            swal({
                title: "Still Working?",
                text: "We'll hold off on using your data.",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        }
        if( $scope.assignment.done == false ){
            swal({
                title: "Assignment Complete!",
                text: "We'll put your data to good use!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        }

        paperCoderService.toggleComplete();
    };
    $scope.save = function(){
        swal({
                title: "Saving...",
                text: "Just a sec!",
                type: "info",
                showCancelButton: true,
                showConfirmButton: false,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            });
        var p = DataService.putAssignment( $scope.assignment );
        p.success( function( res ){
            console.log( "from server: ", res);
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
            console.log( err );
        })
    };
    $scope.popOut = function( paperObject ){
        window.open( paperObject.url,
            "Research Coder | "+paperObject.title,
            "height=700,width=500"
        );
    };

    var p = DataService.loadPaperCoder( localStorage.assignmentKey );
    p.success( function(data){
        console.log( "Data from server", data );

        /* Initialize Data */
        data.assignment.done == "true" ? data.assignment.done = true : data.assignment.done = false ;
        data.assignment.completion = parseFloat( data.assignment.completion );

        // NULL encoding? -> Initialize a blank one: add all project questions in the assignment's encoding. load the structure into activity as a global.
        if( data.assignment.encoding == null || data.assignment.encoding == "" ){
            var encoding = {
                constants: [],
                branches: [[]]
            };
            var assignmentInputs = [];

            addToAssignment( assignmentInputs, data.questions );

            encoding.constants = assignmentInputs;
            data.assignment.encoding = encoding;
            console.log( data.assignment );
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
        addToAssignment( data.assignment.encoding.constants, data.questions );

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

    // adds questions from project into an encoding branch IF they are not already there.
    function addToAssignment( branch, questionsArray ){
        for( var i = 0; i < questionsArray.length; i++ ){
            var qKey = questionsArray[i]['_key'];

            var alreadyHasIt = paperCoderService.branchContains( branch, qKey );
            if( alreadyHasIt ) continue;

            var input = {
                question: qKey,
                data: {
                    dont_flatten_me: ""
                }
            };
            branch.push( input );
        }
    }
}