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

    var form = new FormData( formElement );
    console.log( form );

    var promise = DataService.uploadPapersCSV( localStorage.projectKey, form);
    promise.complete(function (res) {
        console.log("from server", res);
    });

    return false;
}