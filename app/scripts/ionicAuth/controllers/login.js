'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authApp
 */
angular.module('ionicAuth').controller('LoginCtrl', function ($scope, user) {
    $scope.user = user.getUser();
    $scope.login = function () {
        user.login($scope.user);
    }
});
