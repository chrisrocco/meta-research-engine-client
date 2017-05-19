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


    // Custom filter UI
    // ----------
    (function () {
        $('#exampleCustomFilter').footable();
        $('.filter-ui-status').on('change', function () {
            var filtering = FooTable.get('#exampleCustomFilter').use(FooTable.Filtering), // get the filtering component for the table
                filter = $(this).val(); // get the value to filter by
            if (filter === 'none') { // if the value is "none" remove the filter
                filtering.removeFilter('status');
            } else { // otherwise add/update the filter.
                filtering.addFilter('status', filter, ['status']);
            }
            filtering.filter();
        });
    })();


})(document, window, jQuery);


function submitPaperUploadForm( formElement ) {

    var formData = new FormData();
    var file = $("#papersCSV")[0].files[0];
    formData.append( "papersCSV", file );

    var promise = DataService.uploadPapersCSV( localStorage.projectKey, formData );
    promise.success( function ( data ) {
        console.log("from server", data);
    });

    return false;
}

function init( ){
    var p = DataService.loadManageProject( localStorage.projectKey );
    p.success( function( data ){
        var projectObject = data.project;
        var paperQueue = data.paperQueue;

        $("[data-projectname]").html( projectObject.name );

        console.log( "Project Object", projectObject );
        console.log( "Paper Queue", paperQueue );
    })
}