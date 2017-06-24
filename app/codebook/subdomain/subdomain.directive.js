/**
 * A domain
 */
angular
    .module('codebook')
    .directive('bdSubdomain', Subdomain);

function Subdomain() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            domain: "=domain"
        },
        link: function($scope, $element, $attrs, $ctrl) {
            $scope.selectDomain = $scope.$parent.selectDomain;
        },
        templateUrl: '../app/codebook/subdomain/subdomain.html'
    }
}