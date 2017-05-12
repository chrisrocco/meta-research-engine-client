/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2017 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
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
            cells[0].querySelector(".paper").textContent = "test";
            cells[1].querySelector(".completion").style.width = "15%";
            cells[1].querySelector(".completion").textContent = "15%";

            var clone = document.importNode(content, true);
            table.appendChild( clone );
        }

        console.log( data );
    });
}