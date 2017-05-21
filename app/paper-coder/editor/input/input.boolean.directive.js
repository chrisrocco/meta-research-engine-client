/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdInputBoolean', BooleanDirective);

function BooleanDirective( ) {
    return {
        restrict: 'E',
        scope: {
            metaData: "=metaData",
            bindData: "=bindData"
        },
        link: function(scope, element, attrs) {
            console.log( scope.metaData, scope.bindData );
            console.log( "linked to boolean" );
        },
        templateUrl: '../app/paper-coder/editor/input/input-boolean.html',
    }
}