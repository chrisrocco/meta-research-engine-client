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
            function isAlive( domainObject ){
                for(var i = 0; i < domainObject.variables.length; i++){
                    var theField = domainObject.variables[i];
                    if($ctrl.isAlive(theField._key)){
                        return true;
                    }
                }
                for( var sd = 0; sd < domainObject.subdomains.length; sd++ ){
                    var subdomain = domainObject.subdomains[sd];
                    if( isAlive(subdomain) ) return true;
                }
                return false;
            }

            /**
             * Iterively toggles the scope of all child fields
             */
            function toggleScope( domainObject ){
                for(var i = 0; i < domainObject.variables.length; i++){
                    var theField = domainObject.variables[i];
                    $ctrl.toggleScope($ctrl.getInput(theField._key));
                }
                for( var sd = 0; sd < domainObject.subdomains.length; sd++ ){
                    var subdomain = domainObject.subdomains[sd];
                    toggleScope(subdomain);
                }
            }

            function isComplete( domainObject ){
                for(var i = 0; i < domainObject.variables.length; i++){
                    var theField = domainObject.variables[i];
                    var theInput = $ctrl.getInput(theField._key);
                    if(theInput){
                        if(
                            !theInput.data.value
                            && !(theInput.data.min && theInput.data.max)
                        ) return false;
                    }
                }
                for( var sd = 0; sd < domainObject.subdomains.length; sd++ ){
                    var subdomain = domainObject.subdomains[sd];
                    if( isComplete(subdomain) == false ) return false;
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