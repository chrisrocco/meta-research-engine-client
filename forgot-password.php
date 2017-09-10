<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Research Study Encoding System">
    <meta name="author" content="Chris Rocco">
    <title>Forgot password | Big Data UAB</title>

    <?php require 'assets/partials/css-includes.html'; ?>

</head>
<body class="animsition page-forgot-password layout-full">
<?php require 'assets/partials/IE-check.html'; ?>
<!-- Page -->
<div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <h2>Forgot Your Password ?</h2>
        <p>Input your registered email to reset your password</p>
        <form method="post" role="form" onsubmit="return submitRecoverForm()">
            <div class="form-group">
                <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Your Email">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Reset Your Password</button>
            </div>
        </form>
        <footer class="page-copyright">
            <p>WEBSITE BY Chris Rocco</p>
            <p>© 2017. All RIGHT RESERVED.</p>
            <div class="social">
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-twitter" aria-hidden="true"></i>
                </a>
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-facebook" aria-hidden="true"></i>
                </a>
                <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                    <i class="icon bd-dribbble" aria-hidden="true"></i>
                </a>
            </div>
        </footer>
    </div>
</div>
<!-- End Page -->
<?php require 'assets/partials/js-includes.html'; ?>

<script>
    $(document).ready(function ($) {
        Site.run();
    });

    function submitRecoverForm() {
        var form = document.querySelector("form");
        var email = form.email.value;

        console.log(email);

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
                });
            console.log("server response", res);
        });
        promise.error(function (res) {
            if (res.status == 404) {
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
            console.log("fail from server", res);
        });

        return false;
    }
</script>
</body>
</html>