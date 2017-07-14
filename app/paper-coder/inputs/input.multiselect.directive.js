/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdInputMultiselect', MultiselectDirective);

function MultiselectDirective( ) {
    return {
        restrict: 'E',
        scope: {
            metaData: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {
            // setTimeout ( function(){
            //     $( element.find("select")[0] ).selectpicker({
            //         size: 4
            //     });
            // }, 0 );
        },
        template: `<p>{[{metaData.question}]}</p>
                    <div class="form-group">
                        <select ng-model="bindData.selections" multiple data-plugin="selectpicker" data-max-options="2"
                            ng-options="option as option for option in metaData.options">
                            <option value="" >-- Select One --</option>
                        </select>
                    </div>`
    }
}