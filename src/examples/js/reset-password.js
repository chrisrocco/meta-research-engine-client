$(document).ready(function($) {
    Site.run();
    var hash = ""; // get url params
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
        return;
    }
}