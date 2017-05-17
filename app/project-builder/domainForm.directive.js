/**
 * Created by Chris Rocco on 5/16/2017.
 */
angular
    .module('project-builder')
    .directive('bdDomainForm', BigDataDomainForm);

BigDataDomainForm.$inject = ['$scope'];
function BigDataDomainForm() {
    return {
        restrict: 'E',
        replace: true,
        require: "^bdBranch",
        scope: {
            domainObject: "=domainObject",
            submitEvent: "=submitEvent"
        },
        link: function ($scope, $element, $attrs, $ctrl) {

        },
        templateUrl: '../app/paper-coder/field/field.html',
    }
}