'use strict';

angular.module('authApp').provider('authSetting', function () {

    // Private variables
    var server_root = 'http://localhost/projects/reporter_v3/';
    var encryption_key = 'IIASKSOQWKSSSSMCJJJJFKDLSOMKDDLSOPWIFRQKZXSSXKCKDO';
    var httpParams = {
        //service: true,
        //lang   : localStorage.getItem('NG_TRANSLATE_LANG_KEY'), callback: 'JSON_CALLBACK'
    };

    // Public API for configuration
    this.setRootServer = function (s) {
        server_root = s;
    };

    // Public API for configuration
    this.setHttpParams = function (p) {
        if (angular.isObject(p))
            httpParams = p;
        else
            alert('Error: Parameter is not object!');
    };

    // Method for instantiating
    this.$get = function () {
        return {
            encryption_key: encryption_key,
            root          : server_root,
            httpParams    : httpParams
        }
    };
});
