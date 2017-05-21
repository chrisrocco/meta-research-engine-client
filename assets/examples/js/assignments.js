/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
$(document).ready(function() {
  Site.run();
  // loadAssignments();
});
/*

function loadAssignments(){
  var outlet = document.getElementById("templateOutlet");
    $( outlet ).empty();
  var template = document.getElementById("assignmentTemplate");
  var content = template.content;

    var datastatus = '[data-status]';
    var datapapername = '[data-papername]';
    var datapapermeta = '[data-papermeta]';
    var dataprogress = '[data-progress]';
    var dataprogresstext = '[data-progresstext]';
    var datastudyname = '[data-studyname]';
    var datastudymeta = '[data-studymeta]';
    var databutton = '[data-button]';

    var promise = DataService.loadAssignments( AuthService.getUser()['_key'] );
    promise.success( function( data ){

        /!* Load Stats *!/
        var numAssignments = data.length;
        $("[data-numassignments]").html( numAssignments );

        console.log( "server", data );
        for( var i = 0; i < data.length; i++ ) {
            var obj = data[i];
            var paper           =   obj.paper;
            var assignment      =   obj.assignment;
            var study           =   obj.study;

            var statusClass         = "badge badge-primary";
            switch( paper.status ){
                case "active":
                    statusClass = "badge badge-primary";
                    break;
                case "pending":
                    statusClass = "badge badge-warning";
                    break;
                case "conflicted":
                    statusClass = "badge badge-danger";
                    break;
            }

            /!**
             * RENDER INFORMATION
             *!/
            // Setting status button
            content.querySelector( datastatus ).className = statusClass;
            content.querySelector( datastatus ).textContent = paper.status;
            // Setting paper information
            content.querySelector( datapapername ).textContent = paper.title;
            content.querySelector( datapapermeta ).textContent = "PMC-ID: " + paper.pmcID;
            // Setting progress bar
            content.querySelector( dataprogress ).style.width = obj.assignment.completion+"%";
            content.querySelector( dataprogresstext ).textContent = obj.assignment.completion+"%";
            // Setting Study information
            content.querySelector( datastudyname ).textContent = obj.project.name;
            content.querySelector( datastudymeta ).textContent = obj.project.date_created;
            // Setting action button
            content.querySelector( databutton ).dataset.assignmentKey = obj.assignment._key;

            outlet.appendChild( content.cloneNode( true ) );
        }
    });
}

function load( buttonElement ){
    localStorage.assignmentKey = buttonElement.dataset.assignmentKey;
    window.location = "paper-coder.html";
}*/
