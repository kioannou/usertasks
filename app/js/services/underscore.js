angular.module('usertasks.underscoreService', [])
  .factory("_", function underscoreFactory() {
    return window._;
  });