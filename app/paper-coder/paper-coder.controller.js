angular
    .module("paper-coder")
    .controller("PaperCoderController", PaperCoderController);

PaperCoderController.$inject = ['$scope', '$http', '$log', 'paper-coder.service', 'editor.service'];
function PaperCoderController($scope, $http, $log, paperCoderService, editorService) {
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
    }
    $scope.save = function(){
        DataService.putAssignment( $scope.assignment ).then( function(res){
            swal({
                title: "Work Saved!",
                text: "Your work has been uploaded to the database!",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
        })
    };

    DataService.getPaperCoderData( localStorage.assignmentKey ).success( function(data){
        console.log( "Data from server", data );
        console.log( "Assignment", data.assignment );
        console.log( "Questions", data.questions );
        console.log( "Structure", data.structure );

        /* Initialize Data */
        data.assignment.done == "true" ? data.assignment.done = true : data.assignment.done = false ;
        data.assignment.completion = parseFloat( data.assignment.completion );
        if( data.assignment.encoding == null ){
            var encoding = {
                constants: [],
                branches: [[]]
            };
            var assignmentInputs = [];

            for( var i = 0; i < data.questions.length; i++ ){
                var input = {
                    field: data.questions[i]['_key'],
                    content: {
                        value: ""
                    }
                };
                assignmentInputs.push( input );
            }

            encoding.constants = assignmentInputs;
            data.assignment.encoding = encoding;
            console.log( data.assignment );
        }
        if( !data.assignment.encoding.branches){
            data.assignment.encoding.branches = [[]];
        }

        $scope.$apply( function(){
            $scope.assignment = data.assignment;
            $scope.structure = data.structure;
            paperCoderService.loadAssignment( $scope.assignment );
        });
    });
    window.assignment = function () {
        return $scope.assignment;
    }
}