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
                    $injector.get('$state').transitionTo('auth.login', {}, {location: false});
                    var deferred = $q.defer();
                    httpBuffer.append(response.config, deferred);
                    httpBuffer.state($injector.get('$state').current);
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
        'request'      : function (config) {
            config.params = config.params || {};
            _.extend(config.params, defaultParams);
            return config; // or $q.when(config);
        },
        'responseError': function (rejection, q, w, e) {
            return onError(rejection);
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    };

    return interceptor;
});
