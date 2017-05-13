(function(document, window, $){
    'use strict';

    var Site = window.Site;
    $(document).ready(function(){
        Site.run();
    });

})(document, window, jQuery);


function register(){

    var name = $("#name").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirmPassword").val();

    /* Validate Name */
    var tmp = name.split(" ");
    if( tmp.length < 2 ){
        alert("Please provide your full name");
        return false;
    }

    var firstName = tmp[0];
    var lastName = tmp[1];

    /* Validate Email */
    /* Validate Password */
    if( password !== confirmPassword ){
        alert("Passwords do not match");
        return false;
    }

    var promise = AuthService.register( firstName, lastName, email, password );
    promise.complete( function( response ){
        switch( response.status ){
            case 200:
                alert("Registration Successful. You may now login.");
                window.location = "login.html";
                break;
            case 409:
                alert("That email already exists. Do you need to login?");
                break;
        }
    } );

    return false;
}