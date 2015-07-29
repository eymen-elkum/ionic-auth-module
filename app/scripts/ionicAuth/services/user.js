'use strict';

angular.module('ionicAuth').service('user', function (localStorageService, Base64, Encryptor, $http, authSetting, httpBuffer, $rootScope, $state, toastr) {

    var initialized = localStorageService.get('initialized');
    if (initialized === null) {
        pr('The module is not initialized, init now .....');
        //init the settings of this module.
        localStorageService.set('initialized', true);
        localStorageService.set('logged_in', false);
        localStorageService.set('auto_login', false);
        var account = {email: 'demo@kobitbilisim.com', password: Encryptor.cipher('demo')};
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

    function updateAccount(user) {
        account.email = user.email;
        account.password = Encryptor.cipher(user.password);
        localStorageService.set('account', account);
        setHeaders();
    }

    var loginError = function (result) {
        //result: may be error object or server result
        toastr.error('Your credentials are invalid', 'Error');
        return $rootScope.$broadcast('event:auth-loginError', result);
    };

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
            setHeaders();
        },
        login  : function (user) {
            //cleared password!
            updateAccount(user);
            $http.get(authSetting.root + 'private', {ignoreAuthModule: true}).success(function (result) {
                if (result.success == false) {
                    return loginError(result);
                }
                toastr.success('Your have successfully logged in', 'Login success');
                var configUpdater = null;
                var updater = configUpdater || function (config) {
                        return config;
                    };
                $rootScope.$broadcast('event:auth-loginConfirmed', result);
                httpBuffer.retryAll(updater);
            }).error(function (error) {
                return loginError(error);
            });
        }
    }
});
