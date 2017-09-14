let app = angular.module("mre", [
    /* external */
    "ui.router",
    /* services */
    "mre.auth",
    /* shared */
    "mre.sidebar",
    "mre.navbar",
    "mre.footer",
    /* pages */
    "auth",
    "forgot-password",
    "assignments",
    "project-center",
    "project-builder",
    "manage-project",
    "codebook",
    "paper-coder"
]);
app.constant("ENV", window._env);