let app = angular.module("mre", [
    "ui.router",
    "mre.sidebar",
    "mre.navbar",
    "mre.footer"
]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            template: `<div class="page full-width" ng-controller="testController as $ctrl">
                            <div class="page-content">
                                <h3>{{$ctrl.testing}}</h3>
                                <button ui-sref="about">Go to About</button>
                            </div>
                        </div>`
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            template: `<div class="page full-width" ng-controller="testController as $ctrl">
                            <div class="page-content">
                                <h3>About Page!</h3>
                                <button ui-sref="home">Go to Home</button>
                            </div>
                        </div>`
        });

});