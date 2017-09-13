angular
    .module('paper-coder')
    .directive('bdField', BigDataField);

BigDataField.$inject = ['paper-coder.service', 'editor.service', '$compile'];
function BigDataField(paperCoderService, editorService, $compile) {
    return {
        restrict: 'E',
        replace: true,
        require: "^bdBranch",
        scope: {
            questionMetaData: "=field"
        },
        link: function ($scope, $element, $attrs, $ctrl) {
            $scope.isAlive = isAlive;
            $scope.editMe = editMe;
            $scope.toggleScope = toggleScope;
            $scope.generatePreview = generatePreview;
            $scope.inputObject = $ctrl.getInput( $scope.questionMetaData._key );
            $scope.getForm = editorService.getInputForm;
            init();

            function renderQuestions(){
                setTimeout ( function(){
                    if( $scope.inputObject ){
                        // enable tooltip
                        $($element).find(".questionTooltip").webuiPopover({
                            content: $scope.questionMetaData.tooltip,
                            trigger:'hover',
                            placement:'right',
                            title: $scope.questionMetaData.name
                        });
                        $($element).removeAttr('title');
                        // render form
                        var tag = "bd-input-"+$scope.questionMetaData.type;
                        var dr = "<"+tag+" bind='inputObject.data' meta='questionMetaData' >"
                            + "</"+tag+">";
                        $($element).find(".inputOutlet").empty();
                        var elem = angular.element(dr);
                        angular.element( $($element).find(".inputOutlet") )
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
             * Tells the editor service to load this field input object
             */
            function editMe() {
                // we might want this later?
                return;
                $scope.inputObject = $ctrl.getInput($scope.questionMetaData._key);
                editorService.setView($scope.questionMetaData, $scope.inputObject);
            }

            /**
            * Decides if this domain DOM element should be rendered
            * @returns {boolean}
            */
            function isAlive() {
                return $ctrl.isAlive($scope.questionMetaData._key);
            }

            /**
             * Tells the branch controller to toggle the scope of this questionMetaData input object
             */
            function toggleScope (){
                $ctrl.toggleScope($ctrl.getInput($scope.questionMetaData._key));
            }

            /*
            * Generates a preview for different questionMetaData types
            */
            function generatePreview(){
                if(!$scope.inputObject) return;

                var type = $scope.questionMetaData.type;
                if(type === "text" || type === "number" || type === "select" || type === "boolean"){
                    return $scope.inputObject.data.value;
                }
                if(type === "range"){
                    var min = $scope.inputObject.data.rangeMin;
                    var max = $scope.inputObject.data.rangeMax;
                    if( min && max ){
                        return min + " -> " + max;
                    }
                    return "";
                }
            }

            function init(){
                renderQuestions();
                if( $scope.inputObject ){
                    if( $scope.inputObject.data.notReported ){
                        if( $scope.inputObject.data.notReported === "false" ){
                            $scope.inputObject.data.notReported = false;
                        }
                    }
                }
            }
        },
        templateUrl: '../app/paper-coder/field/field.html',
    }
}