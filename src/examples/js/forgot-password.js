$(document).ready(function ($) {
    Site.run();
});

function submitRecoverForm() {
    var form = document.querySelector("form");
    var email = form.email.value;

    console.log( email );

    var promise = DataService.postForgotPassword(email);
    promise.success( function (res) {
        swal({
                title: "Success!",
                text: "An email with recovery instructions has been sent.",
                type: "success",
                showCancelButton: false,
                confirmButtonClass: "btn-success",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            },
            function () {
                window.location = "index.html"
            });
        console.log("server response", res);
    });
    promise.error( function (res) {
        if( res.status == 404 ){
            swal({
                title: "What now?",
                text: "I don't even recognize that email!",
                type: "error",
                showCancelButton: false,
                confirmButtonClass: "btn-danger",
                confirmButtonText: 'OK',
                closeOnConfirm: false
            });
            return;
        }
        swal({
            title: "Ummm..",
            text: "Something went wrong. Sorry.",
            type: "error",
            showCancelButton: false,
            confirmButtonClass: "btn-danger",
            confirmButtonText: 'OK',
            closeOnConfirm: false
        });
        console.log( "fail from server", res );
    });

    return false;
}