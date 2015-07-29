'use strict';

/**
 * @ngdoc function
 * @name authApp.controller:PublicCtrl
 * @description
 * # PublicCtrl
 * Controller of the authApp
 */
angular.module('testApp').controller('PublicCtrl', function ($scope, $http, authSetting) {
    $http.get(authSetting.root + 'public').success(function () {
            pr('Public request success .......');
        }
    ).error(function () {
            er('Public request error .......');
        }
    );
});
