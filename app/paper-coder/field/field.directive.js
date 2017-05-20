angular
    .module('paper-coder')
    .directive('bdField', BigDataField);

BigDataField.$inject = ['paper-coder.service', 'editor.service']
function BigDataField(paperCoderService, editorService) {
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
                return $ctrl.isAlive($scope.fieldObject._key);
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
                var type = $scope.fieldObject.type;
                if( type == "range" ){

                }
            }
        },
        templateUrl: '../app/paper-coder/field/field.html',
    }
}