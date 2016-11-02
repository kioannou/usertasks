angular.module('usertasks.tasksController', [])
    .controller("TasksController", ["$scope", "Navigation", "Users", "_", "ngDialog", "Authentication",
        function ($scope, Navigation, Users, _, ngDialog, Authentication) {

            // Scope variables
            angular.extend($scope, {
                tasksArray: [],
                selectedTaskIndex: undefined,
                newTask: undefined,
                editingTask: undefined
            });

            //Scope methods
            angular.extend($scope, {
                // Adding a task
                addTask: function () {

                    // Creating new task
                    $scope.newTask = {
                        "data": {
                            "type": "photos",
                            "attributes": {
                                "title": "",
                                "status": "",
                                "role": "",
                                "type": "",
                                "updated": null,
                                "created": Date.now()
                            },
                            "relationships": {
                                "member": {
                                    "data": {
                                        "type": JSON.parse(sessionStorage.getItem("selected_user")).type,
                                        "id": JSON.parse(sessionStorage.getItem("selected_user")).id
                                    }
                                }
                            }
                        }
                    };

                    // Updating the created field
                    ngDialog.openConfirm({
                        template: '../../views/modals/newTask.html',
                        showClose: true,
                        overlay: true,
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    }).then(function (value) {
                        // Adding the new task
                        Users.postTask($scope.newTask)
                            .success(function (response) {
                                //Success on adding new task
                                //getting all tasks again
                                getAllTasks();
                            })
                            .error(function (error) {
                                console.log("There was an error on adding a new task: ", error);
                            });

                    }, function (value) {
                        // Close
                    });

                },
                // Removing a task
                removeTask: function (task_id) {
                    Users.deleteTask(task_id)
                        .success(function (response) {
                            //Successful task deletion
                            getAllTasks();
                        })
                        .error(function (error) {
                            console.error("Error on removing task", error);
                        });
                },
                // Editing a task
                editTask: function (task_id) {

                    // Finding the index of the selected task
                    $scope.selectedTaskIndex = _.findIndex($scope.tasksArray, {id: task_id});

                    //Cloning the original task for edit
                    $scope.editingTask = JSON.parse(JSON.stringify($scope.tasksArray[$scope.selectedTaskIndex]));

                    ngDialog.openConfirm({
                        template: '../../views/modals/editingTask.html',
                        showClose: true,
                        overlay: true,
                        className: 'ngdialog-theme-default',
                        scope: $scope
                    }).then(function (value) {
                        // Saving any changes in the selected task

                        // Creating the data object
                        var dataObject = {
                            "data": {
                                "type": "task",
                                "id": editingTask.id,
                                "attributes": {
                                    "role": editingTask.attributes.role,
                                    "status": editingTask.attributes.status,
                                    "title": editingTask.attributes.title,
                                    "type": editingTask.attributes.type,
                                    "updated": Date.now()
                                }
                            }
                        };

                        Users.patchTask(editingTask.id, dataObject)
                            .success(function (response) {
                                //Successful task patch
                                getAllTasks();
                            })
                            .error(function (error) {
                                console.error("There was an error on updating the task: ", error);
                            });

                    }, function (value) {
                        // Closing editing task without saving
                        $scope.editingTask = undefined;
                    });
                }
            });

            // Function for getting all tasks for the given user
            /**
             * NOTE: I was in hurry
             */
            var getAllTasks = function () {
                Users.getTasks()
                    .success(function (response) {
                        $scope.tasksArray = response.data;
                    })
                    .error(function (error) {
                        console.error("There was an error getting the tasks: ", error);
                    })
            };

            // Function for initializing controller
            var init = function () {

                // Checking if the user is logged in
                Authentication.checkToken(function (response) {
                    if (response.success) {

                        //The user is logged in, getting the tasks
                        if (sessionStorage.getItem("selected_user")) {
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

            //Initializing the controller
            init();

        }]);