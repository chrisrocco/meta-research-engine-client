$(document).ready(function($) {
    Site.run();
    window.hash = getQueryVariable( "hash" );
    if( !hash ) window.location = "index.html";
});

function submitResetForm(){
    var form = document.forms.resetForm;

    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;

    if( password !== confirmPassword ){
        swal({
            title: "Wait a minute!",
            text: "Those passwords don't match!",
            type: "warning",
            showCancelButton: false,
            confirmButtonClass: "btn-warning",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
        return false;
    }

    var pr = DataService.postResetPassword( password, hash );
    pr.success( function( response ){
        console.log( "win", response );
        swal({
            title: "Password Reset!",
            text: "Maybe write it down next time?",
            type: "success",
            showCancelButton: false,
            confirmButtonClass: "btn-success",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        }, function(){
            window.location = "login.html";
        });
    });
    pr.error( function( response ){
        console.log("fail", response );
    });

    return false;
}

function getQueryVariable( variable ) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}