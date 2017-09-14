angular
    .module("conflict-resolution")
    .controller("ConflictResolutionController", ConflictResolutionController);

ConflictResolutionController.$inject = ['$scope', '$sce', 'transaction.service'];

function ConflictResolutionController($scope, $sce, TransactionService) {
    $scope.paper = {
        title: "Loading..."
    };
    $scope.assignment = {};
    $scope.collaborators = [];
    init();

    $scope.isMyResponse = isMyResponse;
    $scope.iAgree = function (question, response) {

        TransactionService.addTransaction(question._key, response.data);

        swal({
                title: "Change your Response!?",
                text: "",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function () {
                // TODO - dont immediately resolve

                TransactionService.resolve();

                DataService.putAssignment($scope.assignment).then(function (res) {

                    swal({
                        title: "Done!",
                        text: "Your assignment has been updated with the new response!",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    }, function () {
                        window.location.reload();
                    });
                });
            });
    };

    function isMyResponse(response) {
        return response.users.indexOf($scope.assignment._key) >= 0;
    }

    function init() {
        var p = DataService.loadConflictResolution(localStorage.assignmentKey);
        p.success(function (data) {
            if (data.paper.status !== "conflicted") {
                window.location = "assignments.html";
            }
            $scope.$apply(function () {
                $scope.assignment = data.assignment;
                /* Trust Paper URL */
                data.paper.url = $sce.trustAsResourceUrl(data.paper.url);
                $scope.paper = data.paper;
                $scope.collaborators = data.collaborators;
            });
            TransactionService.startTransaction($scope.assignment);


        });
        p.error(function (err) {

        });
    }

    $scope.popOut = function (paperObject) {
        window.open(paperObject.url,
            "Research Coder | " + paperObject.title,
            "height=700,width=500"
        );
    };
}