angular.module('usertasks.userService', [])
    .factory('Users', function UserFactory($http) {
            return {

                getUsers: function () {
                    return $http({
                        method: 'GET',
                        url: 'dashboard/users.json',
                        headers: {
                            'Content-Type': 'application/vnd.api+json'
                        }
                    });
                },
                getTasks: function () {
                    return $http({
                        method: 'GET',
                        url: 'dashboard/tasks.json',
                        headers: {
                            'Content-Type': 'application/vnd.api+json'
                        }
                    });
                },
                postTask: function (newTaskObject) {
                    return $http({
                        method: 'POST',
                        data: JSON.stringify(newTaskObject),
                        url: 'dashboard/tasks.json',
                        headers: {
                            'Content-Type': 'application/vnd.api+json'
                        }
                    });
                },
                patchTask: function (task_id, editingTaskObject) {

                    return $http({
                        method: 'PATCH',
                        url: 'dashboard/task/' + task_id,
                        data: JSON.stringify(editingTaskObject),
                        headers: {
                            'Content-Type': 'application/vnd.api+json'
                        }
                    });
                },
                deleteTask: function (task_id) {
                    return $http({
                        method: 'DELETE',
                        url: 'dashboard/task/' + task_id,
                        headers: {
                            'Content-Type': 'application/vnd.api+json'
                        }
                    });
                }
            }
        }
    );
