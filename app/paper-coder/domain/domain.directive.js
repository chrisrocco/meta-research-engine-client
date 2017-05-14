/**
 * A domain
 */
angular
    .module('paper-coder')
    .directive('bdDomain', BigDataDomain);

BigDataDomain.$inject = ['paper-coder.service'];
function BigDataDomain(paperCoderService) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        require: "^bdBranch",
        scope: {
            domain: "=domain"
        },
        link: function($scope, $element, $attrs, $ctrl) {
            $scope.name = $ctrl.name;
            $scope.isAlive = isAlive;
            $scope.toggleScope = toggleScope;
            $scope.isComplete = isComplete;

            /**
             * Decides if this domain DOM element should be rendered
             * @returns {boolean}
             */
            function isAlive(){
                for(var i = 0; i < $scope.domain.variables.length; i++){
                    var theField = $scope.domain.variables[i];
                    if($ctrl.isAlive(theField._key)){
                        return true;
                    }
                }
                return false;
            }

            /**
             * Iterively toggles the scope of all child fields
             */
            function toggleScope(){
                for(var i = 0; i < $scope.domain.variables.length; i++){
                    var theField = $scope.domain.variables[i];
                    $ctrl.toggleScope($ctrl.getInput(theField._key));
                }
            }

            function isComplete(){
                for(var i = 0; i < $scope.domain.variables.length; i++){
                    var theField = $scope.domain.variables[i];
                    var theInput = $ctrl.getInput(theField._key);
                    if(theInput){
                        if(
                            !theInput.content.value
                            && !(theInput.content.min && theInput.content.max)
                        ) return false;
                    }
                }
                return true;
            }

            /**
             * Listens for the "edit" event, indicating we should switch to edit mode
             */
            $scope.$on("edit", function(){
                $scope.edit = !$scope.edit;
            });
        },
        templateUrl: '../app/paper-coder/domain/domain.html'
    }
}