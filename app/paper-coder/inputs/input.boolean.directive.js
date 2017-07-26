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
            question: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {
            console.log("boolean with question", scope.question);
        },
        template: `<div class="btn-group">
                        <p data-toggle="tooltip" data-placement="top" title="{[{question.tooltip}]}">{[{question.question}]}</p>
                    </div> <br>
                    <button type="button" ng-class="{'btn-primary': bindData.value==question.trueOption}" class="btn"
                        ng-disabled="bindData.notReported"
                            ng-click="bindData.value = question.trueOption">
                        {[{question.trueOption}]} </button>
                    <button type="button" ng-class="{'btn-primary': bindData.value==question.falseOption}" class="btn"
                        ng-disabled="bindData.notReported"
                            ng-click="bindData.value = question.falseOption">
                        {[{question.falseOption}]} </button>`
    }
}