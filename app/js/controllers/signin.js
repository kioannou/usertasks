angular.module('usertasks.signinController', [])
    .controller("SigninController", ["$scope", "Authentication", 'Navigation', function ($scope, Authentication, Navigation) {

        // Scope variables
        angular.extend($scope, {
            loginParameters: {
                email: "",
                password: "",
                autologin: false
            }
        });

        // Scope methods
        angular.extend($scope, {
            login: function () {
                Authentication.login($scope.loginParameters, function (response) {
                    if (response.success) {
                        // Checking if the user has auto login checked
                        // 1) If it's enabled it sets the login key received from API response to localstorage for future usage
                        // 2) If it is disabled it is saved in session storage
                        if ($scope.loginParameters.autologin) {
                            localStorage.setItem("login_token", JSON.stringify(response.loginKey));
                            localStorage.setItem("user_autologin", JSON.stringify(true));
                        } else {
                            sessionStorage.setItem("login_token", JSON.stringify(response.loginKey));
                        }
                        Navigation.goToState("users");
                    }
                })
            }
        });

        //Function that initializes the controller
        var init = function () {
            // Checking if the saved login key is valid, if so it navigates to users state
            Authentication.checkToken(function (response) {
                if (response.success) {
                    Navigation.goToState("users");
                }
            });
        };

        // Starting the controller
        init();

    }]);