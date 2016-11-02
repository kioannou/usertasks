angular.module('usertasks.usersController', [])
    .controller("UsersController", ["$scope", "Users", "Navigation", "_", "ngDialog", "Authentication",
        function ($scope, Users, Navigation, _, ngDialog, Authentication) {

            // Controllers scope variables
            angular.extend($scope, {
                usersArray: [],
                userDetailsIndex: undefined,
                userDetailsDialog: undefined,
                sortingAttribute: "attributes.first_name",
                searchText: ""
            });

            // Controllers scope methods
            angular.extend($scope, {
                // Function for navigating to users 'tasks' or 'profile' according to parameter: state
                goToUserPage: function (user, state) {
                    sessionStorage.setItem("selected_user", JSON.stringify(user));
                    Navigation.goToState(state);
                },
                // Showing user details
                showUserDetails: function (selectedUserID) {
                    $scope.userDetailsIndex = _.findIndex($scope.usersArray, {id: selectedUserID});

                    // Opening modal to show slected user details
                    ngDialog.openConfirm({
                        template: '../../views/modals/userDetails.html',
                        showClose: true,
                        overlay: true,
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    }).then(function (value) {

                        console.warn(value);

                        //The parameter: value should be 'tasks' or 'profile'
                        $scope.goToUserPage($scope.usersArray[$scope.userDetailsIndex], value);

                    }, function (value) {
                        // Close
                    });
                },
                //Function for setting the sorting attribute
                changeSortAttribute: function (sortingAttribute) {
                    $scope.sortingAttribute = sortingAttribute;
                },
                // Function for searching the users array
                searchFilter: function (usersArray) {
                    var re = new RegExp($scope.searchText, 'i');
                    return !$scope.searchText || re.test(usersArray.attributes.first_name)
                        || re.test(usersArray.attributes.last_name)
                        || re.test(usersArray.attributes.user_type);
                }
            });

            // Function that initializes controller
            var init = function () {

                // Checking if the user is logged in
                Authentication.checkToken(function (response) {
                    if (response.success) {

                        //The user is logged in!

                        //Removing any previously saved user id first
                        //sessionStorage.removeItem("selected_user");

                        //Getting users
                        Users.getUsers()
                            .success(function (response) {
                                $scope.usersArray = response.data;
                            })
                            .error(function (error) {
                                console.error("There was an error on getting users: ", error);
                            });
                    } else {

                        //The user is not logged in  - navigates to sign in page
                        Navigation.goToState('signin');
                    }
                });
            };

            //Starting controller
            init();

        }]);