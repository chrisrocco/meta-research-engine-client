angular
    .module('paper-coder')
    .directive('bdField', BigDataField);

BigDataField.$inject = ['paper-coder.service', '$compile']
function BigDataField(paperCoderService, $compile) {
    return {
        restrict: 'E',
        replace: true,
        require: "^bdBranch",
        scope: {
            question: "=field"
        },
        link: function ($scope, $element, $attrs, $ctrl) {
            $scope.isAlive = isAlive;
            $scope.toggleScope = toggleScope;
            $scope.generatePreview = generatePreview;
            $scope.inputObject = $ctrl.getInput( $scope.question._key );
            init();

            function renderQuestions(){
                setTimeout ( function(){
                    if( $scope.inputObject ){
                        // enable tooltip
                        $element.find(".questionTooltip").webuiPopover({
                            content: $scope.question.tooltip,
                            trigger:'hover',
                            placement:'right',
                            title: $scope.question.name
                        });
                        $element.removeAttr('title');
                        // render form
                        var tag = "bd-input-"+$scope.question.type;
                        var dr = "<"+tag+" bind='inputObject' meta='question' >"
                            + "</"+tag+">";
                        $element.find(".inputOutlet").empty();
                        var elem = angular.element(dr);
                        angular.element( $element.find(".inputOutlet") )
                            .append( elem );
                        $compile(elem)($scope, undefined, {transcludeControllers: $ctrl});
                    }
                }, 0 );
            }

            /**
             * Listens for the "edit" event, indicating we should switch to edit mode
             */
            $scope.$on("edit", function(){
                $scope.edit = !$scope.edit;
            });

            /**
            * Decides if this domain DOM element should be rendered
            * @returns {boolean}
            */
            function isAlive() {
                return true;
                var alive = $ctrl.isAlive($scope.question._key);
                return alive;
            }

            /**
             * Tells the branch controller to toggle the scope of this question input object
             */
            function toggleScope (){
                $ctrl.toggleScope($ctrl.getInput($scope.question._key));
            }

            /*
            * Generates a preview for different question types
            */
            function generatePreview(){
                if(!$scope.inputObject) return;

                var type = $scope.question.type;
                if(type === "text" || type === "number" || type === "select" || type === "boolean"){
                    return $scope.inputObject.value;
                }
                if(type === "range"){
                    var min = $scope.inputObject.rangeMin;
                    var max = $scope.inputObject.rangeMax;
                    if( min && max ){
                        return min + " -> " + max;
                    }
                    return "";
                }
            }

            function init(){
                console.log('loaded question', $scope)
                renderQuestions();
                if( $scope.inputObject ){
                    if( $scope.inputObject.notReported ){
                        if( $scope.inputObject.notReported === "false" ){
                            $scope.inputObject.notReported = false;
                        }
                    }
                }
            }
        },
        templateUrl: '../app/paper-coder/field/field.html',
    }
}