/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
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
            text: "Project Key: "+response.projectKey,
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
        loadProjects();
    });
}

const sampleProject = {
    'name': "Front End Stuff",
    'description': "this project was created by the website"
};