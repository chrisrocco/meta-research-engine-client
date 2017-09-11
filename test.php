<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <meta charset="utf-8">
    <?php require 'assets/partials/meta-includes.html'; ?>
    <title>Test page | Big Data UAB</title>
    <?php require 'assets/partials/css-includes.html'; ?>

    <script src="/node_modules/angular/angular.min.js"></script>
    <script src="/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
    <script src="/app/shared/sidebar/sidebar.module.js"></script>
    <script src="/app/shared/navbar/navbar.module.js"></script>
    <script src="/app/shared/footer/footer.module.js"></script>
    <script src="/app/app.js"></script>

    <script>
        angular.module("mre")
            .controller("testController", function($scope){
                this.testing = "Test Page Definitely Works!";
            });
    </script>
</head>
<body ng-app="mre">
<?php require 'assets/partials/IE-check.html'; ?>

<navbar></navbar>
<sidebar></sidebar>

<ui-view></ui-view>
<!-- Page -->
<div class="page full-width" ng-controller="testController as $ctrl">
    <div class="page-content">
        <h3>{{$ctrl.testing}}</h3>
    </div>
</div>
<!-- Footer -->
<mre-footer></mre-footer>
<?php require 'assets/partials/js-includes.html'; ?>

<script>
    (function (document, window, $) {
        $(document).ready(function () {
            Site.run();
            ApplicationService.renderSession();
        });
    })(document, window, jQuery);
</script>
</body>
</html>