/**
 * Created by Chris Rocco on 5/15/2017.
 */
angular.module("project-center")
    .controller("ProjectCenterController", ProjectCenterController);

ProjectCenterController.$inject = ['$scope'];
function ProjectCenterController( $scope ){
    init();

    // Data Models
    $scope.projects = [];

    // Function Binding
    $scope.openProjectBuilder = openProjectBuilder;
    $scope.openProjectManager = openProjectManager;
    $scope.inviteCollaborator = inviteCollaborator;
    $scope.createProject = createProject;
    $scope.openForkProject = openForkProject;
    $scope.submitFork = submitFork;

    // Property Binding

    /*-----------------------------------------------------------------*/
    function openProjectBuilder( project ){
        localStorage.projectKey = project._key;
        window.location = "project-builder.html";
    }
    function openProjectManager( project ){
        localStorage.projectKey = project._key;
        window.location = "manage-project.html";
    }
    function openForkProject( project ){
        forking = project;
        $('#forkProjectForm').modal('show');
    }

    /**
     * Create Project
     * ================
     */
    function createProject(){
        var form = document.forms.createProjectForm;
        var name = form.name.value;
        var desc = form.description.value;

        var projectObject = {
                'name': name,
                'description': desc
        };
        DataService.postProject( projectObject ).success( function( response ){
            swal({
                    title: "Project Created!",
                    text: "Project Registration Code: "+response.registrationCode,
                    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn-success",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
            });
            init();
        });
    }

    /**
     * Fork Project
     * ==============
     */
    var forking;
    function submitFork(){
        var name = $("#newName").val();
        var description = $("#newDescription").val();
        var p = DataService.forkProject( forking._key, name, description );
        p.success( function( response ){
            swal({
                title: "Project Created!",
                text: "Project Registration Code: "+response.registrationCode,
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            init();
        });
        p.error( function( err ){
            swal({
                title: "Oops..",
                text: "Couldn't fork project",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK :(',
                closeOnConfirm: false
            });
            console.log( "Error: ", err );
        });
    }

    /**
     * Invite Collaborators
     * ==========================
     */
    function inviteCollaborator( project ){
        swal({
                title: "Invite Collaborator",
                text: "Enter a collaborator's email:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "They must have an account",
                showLoaderOnConfirm: true
            },
            function(inputValue){
                if( inputValue === false ) return;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false;
                }
                var promise = DataService.makeProjectOwner( project._key, inputValue );
                promise.success( function( res ){
                    console.log( "Success", res );
                    swal({
                        title: "Authorization Granted!",
                        text: "User " + res.newOwner + " now has access to " + res.projectName,
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    });
                });
                promise.fail( function (res) {
                    console.log( "Fail", res );

                    if( res.status === 400 ){
                        if( res.responseJSON.status === "NO_USER"){
                            swal({
                                title: "No Account Found",
                                text: "We don't have an account with that email registered",
                                type: "warning",
                                showCancelButton: false,
                                confirmButtonClass: "btn-warning",
                                confirmButtonText: 'OK',
                                closeOnConfirm: false
                            });
                            return;
                        }
                    }
                    if( res.status === 409 ){
                        swal({
                            title: "Wait a Minute!",
                            text: "That user is already a collaborator",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonClass: "btn-warning",
                            confirmButtonText: 'OK',
                            closeOnConfirm: false
                        });
                        return;
                    }

                    swal({
                        title: "Opps...",
                        text: "Something went wrong.",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    });
                });
            });
    }

    function init(){
        var p = DataService.getProjectsData();
        p.success(function (data) {
            console.log("from server angular", data);
            $scope.$apply(function(){
                $scope.projects = data.projects;
            });
        });
    }
}