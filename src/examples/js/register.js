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
        swal({
            title: "Psst!",
            text: "Can you put your first AND last name please?",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-warning",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
        return false;
    }
    var firstName = tmp[0];
    var lastName = tmp[1];

    /* Validate Password */
    if( password !== confirmPassword ){
        swal({
            title: "Oops..",
            text: "Those passwords don't match!",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-warning",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
        return false;
    }

    var promise = AuthService.register( firstName, lastName, email, password );
    promise.success( function( res ){
        swal({
            title: "Registration Successful!",
            text: "Check your email for a validation link",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        },
        function(){
            window.location = "login.html"
        })
    });
    promise.error( function( res ){
        if( res.status == 409 ){
            swal({
                title: "Wait a minute!",
                text: "There's already an account with that email. Do you need to login?",
                type: "warning",
                showCancelButton: false,
                confirmButtonClass: "btn-warning",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            })
        }
    });

    return false;
}