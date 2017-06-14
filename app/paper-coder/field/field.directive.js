angular
    .module('paper-coder')
    .directive('bdField', BigDataField);

BigDataField.$inject = ['paper-coder.service', 'editor.service', '$compile']
function BigDataField(paperCoderService, editorService, $compile) {
    return {
        restrict: 'E',
        replace: true,
        require: "^bdBranch",
        scope: {
            fieldObject: "=field"
        },
        link: function ($scope, $element, $attrs, $ctrl) {
            $scope.isAlive = isAlive;
            $scope.editMe = editMe;
            $scope.toggleScope = toggleScope;
            $scope.generatePreview = generatePreview;
            $scope.inputObject = $ctrl.getInput( $scope.fieldObject._key );
            $scope.getForm = editorService.getInputForm;
            init();

            function renderQuestions(){
                setTimeout ( function(){
                    if( $scope.inputObject ){
                        // enable tooltip
                        $element.find(".nametag").webuiPopover({
                            content: $scope.fieldObject.tooltip,
                            trigger:'hover',
                            placement:'right',
                            title: $scope.fieldObject.name
                        });
                        // render form
                        var tag = "bd-input-"+$scope.fieldObject.type;
                        var dr = "<"+tag+" bind='inputObject.data' meta='fieldObject' >"
                            + "</"+tag+">";
                        $element.find(".inputOutlet").empty();
                        angular.element( $element.find(".inputOutlet") )
                            .append($compile(dr)($scope));
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
                $scope.inputObject = $ctrl.getInput($scope.fieldObject._key);
                editorService.setView($scope.fieldObject, $scope.inputObject);
            }

            /**
            * Decides if this domain DOM element should be rendered
            * @returns {boolean}
            */
            function isAlive() {
                var alive = $ctrl.isAlive($scope.fieldObject._key);
                return alive;
            }

            /**
             * Tells the branch controller to toggle the scope of this fieldObject input object
             */
            function toggleScope (){
                $ctrl.toggleScope($ctrl.getInput($scope.fieldObject._key));
            }

            /*
            * Generates a preview for different fieldObject types
            */
            function generatePreview(){
                if(!$scope.inputObject) return;

                var type = $scope.fieldObject.type;
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
            }
        },
        templateUrl: '../app/paper-coder/field/field.html',
    }
}