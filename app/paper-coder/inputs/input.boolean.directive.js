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
            metaData: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {
        },
        template: `<div class="btn-group">
                        <p data-toggle="tooltip" data-placement="top" title="{[{metaData.tooltip}]}">{[{metaData.question}]}</p>
                    </div> <br>
                    <button type="button" ng-class="{'btn-primary': bindData.value==metaData.trueOption}" class="btn"
                            ng-click="bindData.value = metaData.trueOption">
                        {[{metaData.trueOption}]} </button>
                    <button type="button" ng-class="{'btn-primary': bindData.value==metaData.falseOption}" class="btn"
                            ng-click="bindData.value = metaData.falseOption">
                        {[{metaData.falseOption}]} </button>`
    }
}