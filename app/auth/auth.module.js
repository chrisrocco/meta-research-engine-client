angular.module("auth", [])
    .controller("authController", function($scope, $state, authService){
        let afterLogin = function(){
            return $state.go("assignments");
        };

        $scope.loginForm = {};
        $scope.registerForm = {};
        $scope.login = login;
        $scope.register = register;

        function login() {
            authService.login(
                $scope.loginForm.email,
                $scope.loginForm.password
            ).then(
                afterLogin,
                function fail(response) {

                    var data = response.responseJSON;
                    data.reason = data.reason.toUpperCase();

                    if (data.reason === "INACTIVE") {
                        swal({
                            title: "Not so Fast!",
                            text: "You need to validate your email first.",
                            type: "warning",
                            showCancelButton: false,
                            confirmButtonClass: "btn-warning",
                            confirmButtonText: 'OK',
                            closeOnConfirm: false
                        });
                    }
                    if (data.reason === "INVALID") {
                        swal({
                            title: "Invalid Login",
                            text: "Try Again",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: 'OK',
                            closeOnConfirm: false
                        });
                    }
                }
            );
        }
        function register(){

            var name = $scope.registerForm.name;
            var email = $scope.registerForm.email;
            var password = $scope.registerForm.password;
            var confirmPassword = $scope.registerForm.passwordConfirm;

            /* Validate Name */
            var tmp = name.split(" ");
            if( tmp.length < 2 ){
                swal({
                    title: "Psst!",
                    text: "Can you put your first AND last name please?",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                return false;
            }
            var firstName = tmp[0];
            var lastName = tmp[1];

            /* Validate Password */
            if( password !== confirmPassword ){
                swal({
                    title: "Oops..",
                    text: "Those passwords don't match!",
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: 'OK',
                    closeOnConfirm: false
                });
                return false;
            }

            var promise = authService.register( firstName, lastName, email, password );
            promise.success( function( res ){
                swal({
                        title: "Registration Successful!",
                        text: "Check your email for a validation link",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonClass: "btn-success",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    },
                    function(){
                        $state.go("auth.login");
                    })
            });
            promise.error( function( res ){
                if( res.status == 409 ){
                    swal({
                        title: "Wait a minute!",
                        text: "There's already an account with that email. Do you need to login?",
                        type: "warning",
                        showCancelButton: false,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: 'OK',
                        closeOnConfirm: false
                    })
                }
            });

            return false;
        }
    });