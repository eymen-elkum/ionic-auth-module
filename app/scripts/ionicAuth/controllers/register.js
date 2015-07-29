'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the authApp
 */
angular.module('ionicAuth').controller('RegisterCtrl', function ($scope) {
    pr('register account started');
    $scope.submit = function () {
        pr('submit');
    };

});
