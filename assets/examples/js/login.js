/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
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
        swal({
            title: "Not so Fast!",
            text: "You need to validate your email first.",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-warning",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
    }
    if( data.reason === "invalid") {
        swal({
            title: "Invalid Login",
            text: "Try Again",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
    }
}