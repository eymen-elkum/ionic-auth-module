'use strict';

angular.module('ionicAuth').factory('auth_interceptor', function ($q, $log, $injector, $rootScope, httpBuffer) {

    function onError(response) {
        /** @namespace response.config.ignoreAuthModule */
        if (!response.config.ignoreAuthModule) {
            switch (response.status) {
                case 401:
                    pr('Http: responseError -> status_code: ' + response.status);

                    $injector.get('loginService').login();


                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    $rootScope.$broadcast('event:auth-loginRequired', response);
                    return deferred.promise;
                case 403:
                    pr('403');
                    $rootScope.$broadcast('event:auth-forbidden', response);
                    break;
            }
        }

        return $q.reject(response);
    }

    var interceptor = {
        'request': function (config) {
            return config;
        },
        'responseError': function (rejection, q, w, e) {
            return onError(rejection);
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    };

    return interceptor;
});
