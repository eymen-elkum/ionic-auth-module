'use strict';

angular.module('ionicAuth').factory('app_interceptor', function ($q, $log, authSetting, $injector) {

    var defaultParams = authSetting.httpParams;
    var $ionicLoading;
    var toastr;

    function hideLoading(config) {
        if (config.loading != false || config.url.indexOf(authSetting.root) !== -1) {
            $ionicLoading.hide();
        }
    }

    var interceptor = {
        'request'      : function (config) {
            $ionicLoading = $ionicLoading || $injector.get('$ionicLoading');
            toastr = toastr || $injector.get('toastr');
            var no_loading = !config.loading && config.url.indexOf(authSetting.root) === -1;
            if (!no_loading) {
                /*toastr.clear();*/
                var msg = config.loading || 'Loading Content';
                $ionicLoading.show({
                    template         : '<p>' + msg + '</p> <ion-spinner icon="lines" class="spinner-light"></ion-spinner>',
                    hideOnStateChange: true
                });
            }
            _.extend(config.params || {}, defaultParams);
            return config;
        },
        'requestError' : function (rejection) {
            return $q.reject(rejection);
        },
        'response'     : function (response) {
            hideLoading(response.config)
            return response;
        },
        'responseError': function (rejection) {
            hideLoading(rejection.config)
            return $q.reject(rejection);
        }
    };

    return interceptor;
});
