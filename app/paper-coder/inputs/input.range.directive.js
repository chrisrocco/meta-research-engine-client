/**
 * Created by Chris Rocco on 3/29/2017.
 */
angular
    .module('paper-coder')
    .directive('bdInputRange', RangeDirective);

function RangeDirective( ) {
    return {
        restrict: 'E',
        scope: {
            metaData: "=meta",
            bindData: "=bind"
        },
        link: function(scope, element, attrs) {

            var options = {
                min: scope.metaData.rangeMin,
                max: scope.metaData.rangeMax,
                from: scope.bindData.rangeMin,
                to: scope.bindData.rangeMax,
                type: 'int',
                postfix: scope.metaData.unit,
                onChange: handleUpdate
            };

            setTimeout ( function(){
                $( element.find("input")[0] ).ionRangeSlider(options);
            }, 0 );

            function handleUpdate( data ){
                var rangeMin = data.from;
                var rangeMax = data.to;
                scope.$apply( function(){
                    scope.bindData.rangeMin = rangeMin;
                    scope.bindData.rangeMax = rangeMax;
                });
            }
        },
        template: `<p>{[{metaData.question}]}</p>
                    <div class="form-group">
                        <input type="text" id="rangeSlider" />
                    </div>`
    }
}