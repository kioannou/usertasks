angular.module('usertasks.navigationService', [])
    .factory('Navigation', function NavigationFactory($state) {
        return {
            goToState: function (state) {
                return $state.go(state)
            }
        }
    });