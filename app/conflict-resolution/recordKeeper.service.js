angular
    .module("conflict-resolution")
    .factory("recordKeeper.service", RecordKeeperService);

function RecordKeeperService() {

    function previewResponse( masterRecord, response, userKey ){
        // remove user from any other response

        // remove response if empty

        // add user to the new response
    }
}