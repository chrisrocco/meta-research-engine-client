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

    AuthService.login( email, password, win, fail );

    return false;
}

function win(){
    console.log( AuthService.getUser() );
    console.log( AuthService.getToken() );
    window.location = "assignments.html";
}

function fail(){
    alert("Invalid Login");
}