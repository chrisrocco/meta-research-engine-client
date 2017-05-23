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

    DataService.loadPaperCoder( localStorage.assignmentKey ).success( function(data){
        console.log( "Data from server", data );

        /* Initialize Data */
        data.assignment.done == "true" ? data.assignment.done = true : data.assignment.done = false ;
        data.assignment.completion = parseFloat( data.assignment.completion );
        if( data.assignment.encoding == null || data.assignment.encoding == "" ){
            var encoding = {
                constants: [],
                branches: [[]]
            };
            var assignmentInputs = [];

            for( var i = 0; i < data.questions.length; i++ ){
                var input = {
                    question: data.questions[i]['_key'],
                    data: {
                        dont_flatten_me: ""
                    }
                };
                assignmentInputs.push( input );
            }

            encoding.constants = assignmentInputs;
            data.assignment.encoding = encoding;
            console.log( data.assignment );
        }
        if( !data.assignment.encoding.constants ){
            data.assignment.encoding.constants = [];
        }
        if( !data.assignment.encoding.branches){
            data.assignment.encoding.branches = [[]];
        }
        /* Trust Paper URL */
        data.paper.url = $sce.trustAsResourceUrl(data.paper.url);

        $scope.$apply( function(){
            $scope.paper = data.paper;
            $scope.assignment = data.assignment;
            $scope.structure = data.structure;
            paperCoderService.loadAssignment( $scope.assignment );
        });

        $scope.nullify = function (){
            $scope.assignment.encoding = null;
            $scope.save();
            window.location.reload();
        }
    });
}