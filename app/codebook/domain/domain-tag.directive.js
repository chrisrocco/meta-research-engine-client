/**
 * A domain
 */
angular
    .module('codebook')
    .directive('bdDomainTag', DomainTag);

function DomainTag() {
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
        templateUrl: '../app/codebook/domain/domain-tag.html'
    }
}