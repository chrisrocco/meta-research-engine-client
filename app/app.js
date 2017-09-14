let app = angular.module("mre", [
    /* external */
    "ui.router",
    "pageslide-directive",
    /* services */
    "mre.auth",
    /* shared */
    "mre.sidebar",
    "mre.navbar",
    "mre.footer",
    /* pages */
    "auth",
    "forgot-password",
    "resetPassword",
    "assignments",
    "project-center",
    "project-builder",
    "manage-project",
    "codebook",
    "paper-coder",
    "report",
    "conflict-resolution"
]);
app.constant("ENV", window._env);