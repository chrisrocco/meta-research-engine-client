angular
    .module('report')
    .directive('bdReport', Report);

function Report() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            masterEncoding: "=masterEncoding"
        },
        link: function($scope, $element, $attrs, $ctrl) {
            $scope.sayHi = function(){
                alert("Hi");
            };
        },
        controller: function( $scope ){

        },
        templateUrl: '../app/report/report.html'
    }
}