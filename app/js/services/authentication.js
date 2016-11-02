angular.module('usertasks.authenticationService', [])
    .factory('Authentication', function AuthenticationFactory() {
        return {

            //Function for login, in this app it's obviously fake :D
            login: function (parameters, callback) {

                // Let's pretend it's a successful login
                return callback({
                    success: true,
                    loginKey: "8e5f59a202e8ca0b15971a37f6164b55"
                });
            },

            // Function for checking if the key is valid
            checkToken: function (callback) {
                //NOTE: Normally a back-end service would validate the token
                callback((localStorage.getItem("login_token") || sessionStorage.getItem("login_token") ? {success: true} : {success: false}));
            }
        }
    });