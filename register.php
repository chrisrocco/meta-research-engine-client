<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <?php require 'assets/partials/meta-includes.html'; ?>
    <title>Register | Big Data UAB</title>
    <?php require 'assets/partials/css-includes.html'; ?>
</head>
<body class="animsition page-register-v3 layout-full">
<?php require 'assets/partials/IE-check.html'; ?>
<!-- Page -->
<div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">>
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <div class="panel">
            <div class="panel-body">
                <div class="brand">
                    <img class="brand-img" src="/assets/images/UAB-logo.png" width="100%" alt="UAB Research Coder">
                    <!--<h2 class="brand-text font-size-18">Big Data</h2>-->
                </div>
                <form action="#" onsubmit="return register()">
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="text" class="form-control" id="name"/>
                        <label class="floating-label">Full Name</label>
                    </div>
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="email" class="form-control" id="email"/>
                        <label class="floating-label">Email</label>
                    </div>
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="password" class="form-control" id="password"/>
                        <label class="floating-label">Password</label>
                    </div>
                    <div class="form-group form-material floating" data-plugin="formMaterial">
                        <input type="password" class="form-control" id="confirmPassword"/>
                        <label class="floating-label">Re-enter Password</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg mt-40">Sign up</button>
                </form>
                <p>Have account already? Please go to <a href="/login.php">Sign In</a></p>
            </div>
        </div>
    </div>
</div>
<!-- End Page -->
<?php require 'assets/partials/footer.html'; ?>
<?php require 'assets/partials/js-includes.html'; ?>

<script src="/assets/examples/js/register.js"></script>
</body>
</html>