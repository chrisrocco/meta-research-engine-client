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
            metaData: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {
            scope.bindData.value = parseInt( scope.bindData.value );
        },
        template: `<div class="form-group">
                        <label class="control-label" <span ng-bind="metaData.name"></span></label>
                        <input ng-model="bindData.value"
                        type="number" class="form-control" />
                      </div>`
    }
}