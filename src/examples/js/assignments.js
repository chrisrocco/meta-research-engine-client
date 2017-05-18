$(document).ready(function() {
  Site.run();
  loadAssignments();
});

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

        /* Load Stats */
        var numAssignments = data.length;
        $("[data-numassignments]").html( numAssignments );

        console.log( "server", data );
        for( var i = 0; i < data.length; i++ ) {
            var obj = data[i];

            /* set the content object DOM with selectors above */
            content.querySelector( datastatus ).textContent = "active";
            content.querySelector( datapapername ).textContent = obj.paper.title;
            content.querySelector( datapapermeta ).textContent = "PMC-ID: " + obj.paper.pmcID;
            content.querySelector( dataprogress ).style.width = obj.assignment.completion+"%";
            content.querySelector( dataprogresstext ).textContent = obj.assignment.completion+"%";
            content.querySelector( datastudyname ).textContent = obj.project.name;
            content.querySelector( datastudymeta ).textContent = obj.project.date_created;
            content.querySelector( databutton ).dataset.assignmentKey = obj.assignment._key;

            outlet.appendChild( content.cloneNode( true ) );
        }
    });
}

function load( buttonElement ){
    localStorage.assignmentKey = buttonElement.dataset.assignmentKey;
    window.location = "paper-coder.html";
}