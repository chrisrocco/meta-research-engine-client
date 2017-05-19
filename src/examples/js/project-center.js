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