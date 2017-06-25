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
            record: "=record"
        },
        link: function($scope, $element, $attrs, $ctrl) {
            $scope.loadResponseData = loadResponseData;
            $scope.getAvatar = getAvatar;

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

            function getAvatar(){
                return getRandomIntInclusive(1, 9);
            }

            function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
            }
        },
        templateUrl: '../app/report/record/record.html'
    }
}