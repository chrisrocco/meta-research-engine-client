/*!
 * remark (http://getbootstrapadmin.com/remark)
 * Copyright 2017 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $){
    'use strict';

    var Site = window.Site;
    $(document).ready(function(){
        Site.run();
    });

})(document, window, jQuery);


function login(){
    var email = $("#emailInput").val();
    var password = $("#passwordInput").val();

    var promise = AuthService.login( email, password, win, fail );
    promise.fail( fail );

    return false;
}

function win(){
    console.log( AuthService.getUser() );
    console.log( AuthService.getToken() );
    window.location = "assignments.html";
}

function fail( response ){
    var json = response.responseText;
    var data = JSON.parse( json );

    if( data.reason === "inactive" ){
        alert("You must active your account first");
    }
    if( data.reason === "invalid") {
        // do something else
        alert("Invalid Credentials");
    }
}