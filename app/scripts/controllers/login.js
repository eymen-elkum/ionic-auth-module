'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the authApp
 */
angular.module('authApp').controller('LoginCtrl', function ($scope, user) {
    $scope.user = user.getUser();
});
