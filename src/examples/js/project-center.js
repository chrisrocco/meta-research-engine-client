$(document).ready(function () {
    AppProjects.run();
    loadProjects();
});

function loadProjects() {
    var projectTemplate = document.querySelector("#projectPanel");
    var ul = document.querySelector("#project-ul");
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.lastChild);
    }

    DataService.getProjectsData().success(function (data) {
        for(var pr = 0; pr < data.projects.length; pr++){
            var projectData = data.projects[pr];
            projectTemplate.content.querySelector("[data-name]").textContent = projectData.name;
            // set the projectKey to the button in the dataset
            projectTemplate.content.querySelectorAll("[data-key]")[0].dataset.key = projectData._key;
            projectTemplate.content.querySelectorAll("[data-key]")[1].dataset.key = projectData._key;
            projectTemplate.content.querySelectorAll("[data-key]")[2].dataset.key = projectData._key;
            projectTemplate.content.querySelector("[data-rac]").textContent = projectData.registrationCode;

            var clone = projectTemplate.content.cloneNode( true );
            ul.appendChild( clone );
        }
        console.log("from server", data);
    });
}
function submitNewProjectForm(){
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
        loadProjects();
    });
}
function openProjectEditor( buttonElement ){
    swal({
        title: "Are you sure?",
        text: "Editing the project structure will make it hard to compare different versions!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, edit it!",
        closeOnConfirm: false
    },
    function(){
        localStorage.projectKey = buttonElement.dataset.key;
        window.location = "project-builder.html";
    });
}
function openProject( buttonElement ){
    localStorage.projectKey = buttonElement.dataset.key;
    window.location = "manage-project.html";
}
function inviteUser( buttonElement ){
    var projectKey = buttonElement.dataset.key;
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
            var promise = DataService.makeProjectOwner( projectKey, inputValue );
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