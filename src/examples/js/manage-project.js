(function (document, window, $) {
    'use strict';

    var Site = window.Site;

    $(document).ready(function ($) {
        Site.run();
        init();
    });
})(document, window, jQuery);


function submitPaperUploadForm(  ) {
    swal({
        title: "Saving...",
        text: "Just a sec!",
        type: "info",
        showCancelButton: true,
        showConfirmButton: false,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    });

    var formData = new FormData();
    var file = $("#papersCSV")[0].files[0];
    formData.append( "papersCSV", file );

    var promise = DataService.uploadPapersCSV( localStorage.projectKey, formData );
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

    return false;
}

function init( ){
    var p = DataService.loadManageProject( localStorage.projectKey );
    p.success( function( data ){
        var projectObject = data.project;
        var papers = data.papers;
        console.log( "Project Object", projectObject );
        console.log( "Papers", papers );

        $("[data-projectname]").html( projectObject.name );
        var outlet = document.querySelector("#templateOutlet");
        var template = document.querySelector("#paperTemplate").content;
        for (var i = 0; i < papers.length; i++) {
            var paper = papers[i];
            /* server not ready */
            paper.status = 'active';
            /* server not ready */
            template.querySelector("[data-title]").textContent = paper.title;
            template.querySelector("[data-desc]").textContent = paper.description.substring(0, 33) + "..";
            template.querySelector("[data-assignmentCount]").textContent = paper.assignmentCount;
            template.querySelector("[data-status]").textContent = paper.status;
            outlet.appendChild( template.cloneNode( true ) );
        }
        initFooTable();
        initDropify();
    })
}

function initFooTable(){
    $('#papersTable').footable( );
    $('.filter-ui-status').on('change', function () {
        var filtering = FooTable.get('#papersTable').use(FooTable.Filtering), // get the filtering component for the table
            filter = $(this).val(); // get the value to filter by
        if (filter === 'none') { // if the value is "none" remove the filter
            filtering.removeFilter('status');
        } else { // otherwise add/update the filter.
            filtering.addFilter('status', filter, ['status']);
        }
        filtering.filter();
    });
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