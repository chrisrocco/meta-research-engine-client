<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    <meta charset="utf-8">
    <?php require 'assets/partials/meta-includes.html'; ?>
    <title>Test page | Big Data UAB</title>
    <?php require 'assets/partials/css-includes.html'; ?>

    <!-- PAGES
    ================= -->
    <!-- Assignments -->
    <link rel="stylesheet" href="/assets/vendor/slidepanel/slidePanel.css">
    <link rel="stylesheet" href="/assets/vendor/chartist/chartist.css">
    <link rel="stylesheet" href="/assets/vendor/chartist-plugin-tooltip/chartist-plugin-tooltip.css">
    <link rel="stylesheet" href="/assets/vendor/jquery-selective/jquery-selective.css">
    <link rel="stylesheet" href="/assets/examples/css/assignments2.css">
    <!-- Project Center -->
    <link rel="stylesheet" href="/assets/vendor/jquery-selective/jquery-selective.css">
    <link rel="stylesheet" href="/assets/vendor/bootstrap-sweetalert/sweetalert.css">
    <link rel="stylesheet" href="/assets/examples/css/apps/projects.css">

    <!-- ANGULAR
    ================= -->
    <!-- external -->
    <script src="/node_modules/angular/angular.min.js"></script>
    <script src="/node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
    <!-- services -->
    <script src="/app/shared/services/auth/auth.module.js"></script>
    <!-- shared -->
    <script src="/app/shared/sidebar/sidebar.module.js"></script>
    <script src="/app/shared/navbar/navbar.module.js"></script>
    <script src="/app/shared/footer/footer.module.js"></script>
    <!-- Pages -->
    <script src="/app/assignments/assignments.module.js"></script>
    <script src="/app/assignments/assignments.controller.js"></script>
    <script src="/app/project-center/project-center.module.js"></script>
    <script src="/app/project-center/project-center.controller.js"></script>
    <!-- main -->
    <script src="/app/app.js"></script>
</head>
<body ng-app="mre">
<?php require 'assets/partials/IE-check.html'; ?>

<navbar></navbar>
<sidebar></sidebar>
<ui-view></ui-view>
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