$(document).ready(function($) {
  Site.run();
  loadAssignments();
});


function loadAssignments(){
    var table = document.querySelector("tbody");

    var template = document.querySelector("#assignmentRow");
    var content = template.content;
    var cells = content.querySelectorAll("td");

    var promise = DataService.getUsersAssignments( AuthService.getUser()['_key'] );
    promise.success( function( data ){
        // render the assignment data
        for( var i = 0; i < data.length; i++ ){

            var assignment = data[i];

            cells[0].querySelector(".paper").textContent = assignment._id;
            cells[1].querySelector(".completion").style.width = assignment.completion + "%";
            cells[1].querySelector(".completion").textContent = assignment.completion + "%";
            cells[2].querySelector("button").dataset.assignmentKey = assignment._key;

            console.log( cells[2] );

            var clone = content.cloneNode( true );
            table.appendChild( clone );
        }

        console.log( data );
    });
}

function loadAssignment( element ){
    localStorage.assignmentKey = element.dataset.assignmentKey;
    window.location = "paper-coder.html";
}