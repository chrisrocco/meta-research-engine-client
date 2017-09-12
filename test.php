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
    <!-- Project Builder -->
    <link rel="stylesheet" href="/assets/vendor/bootstrap-sweetalert/sweetalert.css">
    <link rel="stylesheet" href="/assets/vendor/toastr/toastr.css">
    <link rel="stylesheet" href="/assets/vendor/bootstrap-treeview/bootstrap-treeview.css">
    <link rel="stylesheet" href="/assets/vendor/jstree/jstree.min.css">
    <link rel="stylesheet" href="/assets/vendor/fontIconPicker-2.0.0/css/jquery.fonticonpicker.css">
    <link rel="stylesheet" href="/assets/vendor/bootstrap-select/bootstrap-select.css">
    <link rel="stylesheet" href="/assets/vendor/multi-select/multi-select.css">
    <link rel="stylesheet" href="/assets/fonts/font-awesome/font-awesome.css">
    <link rel="stylesheet" href="/assets/vendor/bootstrap-tokenfield/bootstrap-tokenfield.css">

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
    <script src="/app/project-builder/project-builder.module.js"></script>
    <script src="/app/project-builder/project-builder.controller.js"></script>
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

<!-- PAGES
================= -->
<!-- Project Builder -->
<script src="/assets/vendor/bootstrap-sweetalert/sweetalert.js"></script>
<script src="/assets/vendor/jquery-placeholder/jquery.placeholder.js"></script>
<script src="/assets/vendor/toastr/toastr.js"></script>
<script src="/assets/vendor/bootstrap-treeview/bootstrap-treeview.min.js"></script>
<script src="/assets/vendor/jstree/jstree.min.js"></script>
<script src="/assets/vendor/fontIconPicker-2.0.0/jquery.fonticonpicker.js"></script>
<script src="/assets/vendor/bootstrap-tokenfield/bootstrap-tokenfield.min.js"></script>
<script src="/assets/vendor/bootstrap-select/bootstrap-select.js"></script>
<script src="/assets/vendor/multi-select/jquery.multi-select.js"></script>
<script src="/assets/js/Plugin/responsive-tabs.js"></script>
<script src="/assets/js/Plugin/closeable-tabs.js"></script>
<script src="/assets/js/Plugin/tabs.js"></script>
<script src="/assets/js/Plugin/jquery-placeholder.js"></script>
<script src="/assets/js/Plugin/material.js"></script>
<script src="/assets/js/Plugin/toastr.js"></script>
<script src="/assets/js/Plugin/bootstrap-treeview.js"></script>
<script src="/assets/js/Plugin/jstree.js"></script>
<script src="/assets/js/Plugin/bootstrap-tokenfield.js"></script>
<script src="/assets/js/Plugin/bootstrap-select.js"></script>
<script src="/assets/js/Plugin/multi-select.js"></script>

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