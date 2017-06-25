/**
 * A domain
 */
angular
    .module('report')
    .directive('bdRecord', Record);

function Record() {
    return {
        restrict: 'E',
        require: "^bdReport",
        replace: true,
        scope: {
            record: "=record",
            asUser: "=asUser",
            editable: "=editable"
        },
        link: function($scope, $element, $attrs, $ctrl) {
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
        templateUrl: '../app/report/record/record.html'
    }
}