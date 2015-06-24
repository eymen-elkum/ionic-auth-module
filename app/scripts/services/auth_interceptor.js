'use strict';

angular.module('authApp').factory('auth_interceptor', function ($q, $log, authSetting, $injector, $rootScope, httpBuffer) {

    var defaultParams = authSetting.httpParams;

    function onError(response) {
        /** @namespace response.config.ignoreAuthModule */
        if (!response.config.ignoreAuthModule) {
            switch (response.status) {
                case 401:
                    pr('Http: responseError -> status_code: ' + response.status);
                    pr('before redirect ...');
                    $injector.get('$state').transitionTo('auth.login');
                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    $rootScope.$broadcast('event:auth-loginRequired', response);
                    return deferred.promise;
                    break;
                case 403:
                    pr('403');
                    $rootScope.$broadcast('event:auth-forbidden', response);
                    break;
            }
        }

        return response; // or $q.when(config);
    }

    var interceptor = {
        'request'      : function (config) {
            config.params = config.params || {};
            _.extend(config.params, defaultParams);
            return config; // or $q.when(config);
        },
        'response'     : function (response) {
            return onError(response);
        },
        'requestError' : function (rejection) {
            pr('Http: requestError');
            return rejection;
        },
        'responseError': function (rejection, q, w, e) {
            return onError(rejection);
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    };

    return interceptor;
});
