'use strict';

angular.module('authApp').service('user', function (localStorageService, Base64, Encryptor, $http) {

    pr('start user service')

    var initialized = localStorageService.get('initialized');
    if (initialized === null) {
        pr('The module is not initialized, init now .....');
        //init the settings of this module.
        localStorageService.set('initialized', true);
        localStorageService.set('logged_in', false);
        localStorageService.set('auto_login', false);
        var account = {email: 'test@example.com', password: Encryptor.cipher('test')};
        localStorageService.set('account', account);
    }

    var logged_in = localStorageService.get('logged_in'),
        auto_login = localStorageService.get('auto_login'),
        account = localStorageService.get('account'),
        initialized = localStorageService.get('initialized');

    function setHeaders() {
        var curr = {
            email   : account.email,
            password: Encryptor.deCipher(account.password)
        };
        var auth_data = Base64.encode(curr.email + ':' + curr.password);
        $http.defaults.headers.common.Authorization = 'Basic ' + auth_data;
    }

    if (auto_login) {
        setHeaders();
    }

    return {
        logged : function () {
            return logged_in;
        },
        getUser: function () {
            return {
                email   : account.email,
                password: Encryptor.deCipher(account.password)
            };
        },
        start  : function () {

        }
    }
});
