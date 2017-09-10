<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <?php require 'assets/partials/meta-includes.html'; ?>
    <title>Forgot password | Big Data UAB</title>
    <?php require 'assets/partials/css-includes.html'; ?>
    <link rel="stylesheet" href="/assets/examples/css/pages/forgot-password.css">
</head>
<body class="animsition page-forgot-password layout-full">
<?php require 'assets/partials/IE-check.html'; ?>
<!-- Page -->
<div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
        <h2>Reset Password</h2>
        <p>Please confirm your new password</p>
        <form name="resetForm" onsubmit="return submitResetForm()">
            <div class="form-group">
                <input name="password" type="password" class="form-control" id="password" placeholder="New Password">
            </div>
            <div class="form-group">
                <input name="confirmPassword" type="password" class="form-control" id="confirmPassword"
                       placeholder="Confirm New Password">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Change Password</button>
            </div>
        </form>
        <?php require 'assets/partials/footer.html'; ?>
    </div>
</div>
<!-- End Page -->
<?php require 'assets/partials/js-includes.html'; ?>
<script src="/assets/examples/js/reset-password.js"></script>
</body>
</html>