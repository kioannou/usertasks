angular.module('usertasks.profileController', [])
    .controller("ProfileController",["$scope", "Authentication","Users","Navigation", function($scope,Authentication,Users,Navigation){

        //Scope variables
        angular.extend($scope,{
            selectedUser: undefined,
            selectedUserTasks:[]
        });

        // Function for getting all tasks for the given user
        var getAllTasks = function () {
            Users.getTasks()
                .success(function (response) {
                    console.warn(response);
                    $scope.tasksArray = response.data;
                })
                .error(function (error) {
                    console.error("There was an error getting the tasks: ", error);
                })
        };

        // Function that initializes controller
        var init = function () {
            // Checking if the user is logged in
            Authentication.checkToken(function (response) {
                if (response.success) {

                    //The user is logged in, getting the tasks
                    if (sessionStorage.getItem("selected_user")) {

                        //Assigning the selected user
                        $scope.selectedUser = JSON.parse(sessionStorage.getItem("selected_user"));

                        getAllTasks();

                    } else {
                        Navigation.goToState("users");
                    }

                } else {

                    //The user is not logged in  - navigates to sign in page
                    Navigation.goToState('signin');
                }
            });
        };

        //Starting controller
        init();

}]);