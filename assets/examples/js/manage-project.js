/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
(function (document, window, $) {
    'use strict';

    var Site = window.Site;

    $(document).ready(function ($) {
        Site.run();
        init();
    });
})(document, window, jQuery);


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

function init( ){
    initFooTable();
    initDropify();

    var p = DataService.loadManageProject( localStorage.projectKey );
    p.success( function( data ){
        var projectObject = data.project;
        var papers = data.papers;
        console.log( "Project Object", projectObject );
        console.log( "Papers", papers );
        loadInFooTable( papers, projectObject );
        initFooTable();
        initDropify();
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

var bdActive = document.querySelector("#bd-active").content;
var bdPending = document.querySelector("#bd-pending").content;
var bdConflicted = document.querySelector("#bd-conflicted").content;
var bdComplete = document.querySelector("#bd-complete").content;
function loadInFooTable( papers, projectObject ){
    $("[data-projectname]").html( projectObject.name );
    var outlet = document.querySelector("#templateOutlet");
    var template = document.querySelector("#paperTemplate").content;
    for (var i = 0; i < papers.length; i++) {
        var paper = papers[i];
        template.querySelector("[data-title]").textContent = paper.title;
        template.querySelector("[data-desc]").textContent = paper.description.substring(0, 33) + "..";
        template.querySelector("[data-assignmentCount]").textContent = paper.assignmentCount;

        var statusOutlet = template.querySelector("[data-status]");
        while( statusOutlet.hasChildNodes() ){
            statusOutlet.removeChild( statusOutlet.lastChild );
        }

        switch ( paper.status ){
            case "active":
                template.querySelector("[data-status]").appendChild( bdActive.cloneNode( true ) );
                break;
            case "pending":
                template.querySelector("[data-status]").appendChild( bdPending.cloneNode( true ) );
                break;
            case "conflicted":
                template.querySelector("[data-status]").appendChild( bdConflicted.cloneNode( true ) );
                break;
            case "complete":
                template.querySelector("[data-status]").appendChild( bdComplete.cloneNode( true ) );
                break;
        }

        outlet.appendChild( template.cloneNode( true ) );
    }
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