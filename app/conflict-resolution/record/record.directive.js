/**
 * A domain
 */
angular
    .module('conflict-resolution')
    .directive('bdRecord', Record);

function Record() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            record: "=record",
            conflictsOnly: "=conflictsOnly",
            asUser: "=asUser",
            editable: "=editable"
        },
        link: function($scope, $element, $attrs, $ctrl) {
            $scope.isMyResponse = $scope.$parent.isMyResponse;
            $scope.iAgree = $scope.$parent.iAgree;
            $scope.loadResponseData = loadResponseData;

            function loadResponseData( response ){
                var d = response.data;
                if( d.value ){
                    return d.value;
                }
                if( d.rangeMin && d.rangeMax ){
                    return ( d.rangeMin + " -> " + d.rangeMax );
                }
                if( d.min && d.max ){
                    return ( d.min + " -> " + d.max );
                }
                return "No Response";
            }
        },
        templateUrl: '../app/conflict-resolution/record/record.html'
    }
}