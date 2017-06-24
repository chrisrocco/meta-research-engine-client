angular.module("manage-project")
    .controller("ManageProjectController", ManageProjectController);

ManageProjectController.$inject = [ '$scope' ];
function ManageProjectController ( $scope ){
    $scope.tableRows = [];
    $scope.project = null;

    init();

    function init(){
        initDropify();
        var p = DataService.loadManageProject( localStorage.projectKey );
        p.success( function( data ){
            var project = data.project;
            var papers = data.papers;
            $scope.$apply(function(){
                $scope.tableRows = papers;
                $scope.project = project;
            });
        });
        p.error( function( err ){
            console.log( "error loading activity", err );
            swal({
                title: "Opps...",
                text: "Something went wrong loading the activity",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK :(',
                closeOnConfirm: false
            });
        });
    }
}


function initDropify(){
    $('#papersCSV').dropify({
        messages: {
            'default': 'Drag and drop a file here or click',
            'replace': 'Drag and drop or click to replace',
            'remove':  'Remove',
            'error':   'Ooops, something is off.'
        },
        showErrors: false
    });
}