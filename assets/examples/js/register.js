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


function register(){
    var name = $("#name").val();
    var tmp = name.split(" ");

    var firstName = tmp[0];
    var lastName = tmp[1];
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    var promise = AuthService.register( firstName, lastName, email, password );
    promise.success( function( data ){
        alert("Registration Successful");
        window.location = "login.html";
    } );

    return false;
}