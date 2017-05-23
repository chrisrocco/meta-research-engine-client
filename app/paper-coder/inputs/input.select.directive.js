/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdInputSelect', SelectDirective);

function SelectDirective( ) {
    return {
        restrict: 'E',
        scope: {
            metaData: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {
        },
        template: `<p>{[{metaData.question}]}</p>
                    <div class="form-group">
                        <select class="form-control" ng-model="bindData.value" 
                            ng-options="option as option for option in metaData.options">
                            <option value="" >-- Select One --</option>
                        </select>
                    </div>`
    }
}