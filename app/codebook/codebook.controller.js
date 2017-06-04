/**
 * Created by Chris Rocco on 5/15/2017.
 */
angular.module("codebook")
    .controller("CodebookController", CodebookController);

CodebookController.$inject = ['$scope'];
function CodebookController( $scope ){
    $scope.projects = defaultModel;
    $scope.selectedProject = $scope.projects[0];
    $scope.selectedDomain = $scope.selectedProject.structure[0];
    init();

    $scope.selectDomain = selectDomain;
    $scope.selectProject = selectProject;

    function selectDomain( domain ){
        $scope.selectedDomain = domain;
    }
    function selectProject( project ){
        $scope.selectedProject = project;
    }
    function init(){
        var pr = DataService.loadCodeBook();
        pr.success( function( data ){
            $scope.$apply( function(){
                $scope.projects = data;
                $scope.selectedProject = $scope.projects[0];
            });
            console.log( data );
        });
    }
}

const defaultModel = [
    {
        project: {
            name: "Default Project"
        },
        structure: [
            {
                _id: "12345",
                name: "Default Domain",
                questions: [
                    {
                        name: "Default Question"
                    }
                ]
            }
        ]
    }
];