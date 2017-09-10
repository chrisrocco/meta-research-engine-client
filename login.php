<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="Research Study Encoding System">
    <meta name="author" content="Chris Rocco">
    <title>Login | Big Data UAB</title>
    <?php require 'assets/partials/css-includes.html'; ?>
</head>
<body class="animsition page-login-v3 layout-full">
<!--[if lt IE 8]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<!-- Page -->
<div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">>
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <div class="panel">
            <div class="panel-body">
                <div class="brand">
                    <img class="brand-img" src="/assets/images/UAB-logo.png" width="100%" alt="UAB Research Coder">
                </div>
                <form action="#" onsubmit="return login()">
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="email" class="form-control" name="email" id="emailInput"/>
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="password" class="form-control" name="password" id="passwordInput"
                        />
                        <label class="floating-label">Password</label>
                    </div>
                    <div class="form-group clearfix">
                        <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
                            <input type="checkbox" id="inputCheckbox" name="remember">
                            <label for="inputCheckbox">Remember me</label>
                        </div>
                        <a class="float-right" href="/forgot-password.php">Forgot password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg mt-40">Sign in</button>
                </form>
                <p>Still no account? Please go to <a href="/register.php">Sign up</a></p>
            </div>
        </div>
        <?php require 'assets/partials/footer.html'; ?>
    </div>
</div>
<!-- End Page -->
<?php require 'assets/partials/js-includes.html'; ?>
<script src="/assets/examples/js/login.js"></script>
</body>
</html>