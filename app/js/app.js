angular.module('usertasks',
    ['ui.router', 'usertasks.profileController', 'usertasks.tasksController',
        'usertasks.signinController', 'usertasks.usersController', 'usertasks.userService','ngDialog',
        'usertasks.navigationService', 'usertasks.underscoreService', 'usertasks.authenticationService'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/',
                cache: false,
                templateUrl: 'views/users.html',
                controller: 'UsersController'
            })
            .state('tasks', {
                url: '/tasks',
                cache: false,
                templateUrl: 'views/tasks.html',
                controller: 'TasksController'
            })
            .state('profile', {
                url: '/profile',
                cache: false,
                templateUrl: 'views/profile.html',
                controller: 'ProfileController'
            })
            .state('signin', {
                url: '/signin',
                cache: false,
                templateUrl: 'views/signin.html',
                controller: 'SigninController'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/signin');

    });
