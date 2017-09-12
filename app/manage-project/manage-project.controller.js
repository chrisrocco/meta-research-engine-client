angular.module("manage-project")
    .controller("ManageProjectController", ManageProjectController);

ManageProjectController.$inject = [ '$scope' ];
function ManageProjectController ( $scope ){
    $scope.tableRows = [];
    $scope.project = null;

    $scope.loadReport = loadReport;

    init();

    function loadReport( paper ){
        localStorage.paperKey = paper.key;
        // console.log( paper );
        window.location = "report.html";
    }
    function init(){
        $("#pmcidList").tokenfield();
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

function submitPaperUploadForm(  ) {
    var file = $("#papersCSV")[0].files[0];

    var formData = new FormData();
    formData.append( "papersCSV", file );

    Papa.parse(file, {
        complete: function(results) {
            console.log("Finished:", results.data);
            renderUploadPreview( results.data );
        }
    });

    return false;
}

function doUpload(  ){
    var postData = {
        "papers": previewingPaperData
    };

    swal({
        title: "Uploading...",
        text: "Just a sec!",
        type: "info",
        showCancelButton: true,
        showConfirmButton: false,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    });

    var promise = DataService.uploadPapersCSV( localStorage.projectKey, postData );
    promise.success( function ( data ) {
        var newPaperCount = data.newPaperCount;
        swal({
            title: "Success!",
            text: "You have uploaded " + newPaperCount + " new papers",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        }, function(){
            window.location.reload();
        });
        console.log("success from server", data);
    });
    promise.error( function( response ) {
        var badColumns = "columnCountError";
        var badFile    = "parseFailure";
        var empty      = "emptyFileError";

        var error = response.responseJSON;
        switch ( error.reason ){
            case badColumns:
                swal({
                    title: "Invalid File",
                    text: "Invalid column count on line " + error.row,
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                break;
            case badFile:
                swal({
                    title: "Invalid File",
                    text: "We couldn't even parse the thing!",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                break;
            case empty:
                swal({
                    title: "That's.. Empty?",
                    text: "Looks like you submitted an empty file!",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                break;
        }
        console.log("fail from server", error);
    });
}
function findPapersHandler(){
    var tokens = $("#pmcidList").tokenfield('getTokens');

    var ids = [];
    tokens.forEach( function(token){
        ids.push( token.value );
    });

    var p = DataService.uploadPapersByID( localStorage.projectKey, ids );
    p.success( function( response ){
        if( response.succeeded.length == 0 ){
            swal({
                title: "No Papers Found!",
                text: "We search PubMed Central, but didn't find any of those PMC-ID's!",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            return;
        }
        swal({
            title: "Success!",
            text: response.succeeded.length + " articles were found, and " + response.failed.length + " were not",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        }, function(){
            window.location.reload();
        });
    });
    p.error( function( error ){
        swal({
            title: "Oops",
            text: "Something went wrong",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
    });
    console.log( "PMC ID's", ids );
}

var previewingPaperData;
function renderUploadPreview( parsedCSV ){
    previewingPaperData = parsedCSV;
    $('#uploadPreviewTable').DataTable( {
        data: parsedCSV,
        columns: [
            { title: "Title" },
            { title: "Description" },
            { title: "Embedding URL" }
        ]
    } );

    $("#uploadPreviewModal").modal("show");
}