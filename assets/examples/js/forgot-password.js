/*!
 * bigdata (https://uab-energetics.github.io/bigdata-app/html/)
 * Copyright 2017 chrisrocco
 * Licensed under the Themeforest Standard Licenses
 */
$(document).ready(function ($) {
    Site.run();
});

function submitRecoverForm() {
    var form = document.querySelector("form");
    var email = form.email.value;

    var promise = DataService.postForgotPassword(email);
    promise.success(function (res) {
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
            })
        console.log("server response", res);
    });

    return false;
}