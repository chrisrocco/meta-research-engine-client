angular.module("mre.login", [])
    .controller("loginController", function($scope, $state){
        let afterLogin = function(){
            return $state.go("assignments");
        };

        $scope.form = {};
        $scope.login = login;

        function login() {
            AuthService.login(
                $scope.form.email,
                $scope.form.password
            ).then(
                afterLogin,
                function fail(response) {
                    console.log("fail", response);
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
    });