angular
    .module('paper-coder')
    .directive('bdBranch', BigDataBranch);

BigDataBranch.$inject = ['paper-coder.service'];
function BigDataBranch(paperCoderService) {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            branch: "=branch",
            name: "=name",
            label: "=label"
        },
        link: function($scope, $element, $attrs, $ctrl){
            $ctrl.branch = $scope.branch;
            $ctrl.name = $scope.name;

            /**
             * Tell all of my child directives that the user clicked edit mode
             */
            $scope.toggleEditMode = function(){
                $scope.edit = !$scope.edit;
                $scope.$broadcast("edit");
            };

            $scope.deleteMe = function(){
                paperCoderService.deleteBranch($ctrl.branch);
            };
        },
        controllerAs: 'branch',
        controller: function ($scope) {
            /**
             * Does this branch have the specified variable?
             * @param fieldName
             * @returns {boolean}
             */
            this.isAlive = function(fieldName){
                for(var i = 0; i < $scope.branch.length; i++){
                    // If the 'Input' exist in the encoding branch
                    if($scope.branch[i].question === fieldName){
                        return true;
                    }
                }
                // If we didn't find it, return false
                return false;
            }

            /**
             * Find and return the question input object associated with the question name
             * @param fieldName
             * @returns {*}
             */
            this.getInput = function(fieldName){
                for(var i = 0; i < $scope.branch.length; i++){
                    // If the 'Input' exist in the encoding branch
                    if($scope.branch[i].question === fieldName){
                        return $scope.branch[i];
                    }
                }
            }

            /**
             * Tells the paper coder service to move this input object's scope
             * @param inputObject
             */
            this.toggleScope = function(inputObject){
                console.log("Branch toggle scope ", inputObject);
                paperCoderService.toggleScope(inputObject);
            }
        },
        templateUrl: '../app/paper-coder/branch/branch.html'
    }
}