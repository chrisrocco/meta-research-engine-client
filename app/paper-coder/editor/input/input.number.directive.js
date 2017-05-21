/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdInputNumber', NumberDirective);

function NumberDirective( ) {
    return {
        restrict: 'E',
        scope: {
            bindData: "=bindData"
        },
        link: function(scope, element, attrs) {

        },
        templateUrl: '../app/paper-coder/editor/input/input-number.html',
    }
}