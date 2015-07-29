'use strict';

function pr(o) {
    console.log('--------------------------------------------------------')
    console.log(o)
    console.log('........................................................')
}
function er(o) {
    console.log('--------------------------------------------------------')
    console.warn(o)
    console.log('........................................................')
}
angular.module('auth-templates', []);
angular.module('ionicAuth', ['ui.router', 'ionic', 'LocalStorageModule', 'ngAuth-buffer', 'ngAnimate','formly','formlyIonic','ngMessages','toastr','auth-templates']);
angular.module('ionicAuth').config(function ($stateProvider, localStorageServiceProvider, $httpProvider, toastrConfig) {

    $httpProvider.interceptors.push('auth_interceptor');
    $httpProvider.interceptors.push('app_interceptor');

    localStorageServiceProvider.setPrefix('app.auth');

    /* toastrConfig */
    angular.extend(toastrConfig, {
        allowHtml: true,
        autoDismiss: true,
        closeButton: true,
        maxOpened: 3,
        /*target: 'ion-nav-view',*/
        positionClass: 'toast-top-full-width'
    });


    $stateProvider
        .state('auth', {
            url     : "/auth",
            template: "<ion-nav-view name='auth'></ion-nav-view>",
            abstract: true
            //controller: 'MainCtrl'
        })
        .state('auth.register', {
            url  : "/register",
            views: {
                auth: {
                    templateUrl: "views/ionicAuth/register.html",
                    controller : 'RegisterCtrl'
                }
            }
        })
        .state('auth.profile', {
            url  : "/profile",
            views: {
                auth: {
                    templateUrl: "views/ionicAuth/profile.html",
                    controller : 'ProfileCtrl'
                }
            }
        })
        .state('auth.reset_password', {
            url  : "/reset_password",
            views: {
                auth: {
                    templateUrl: "views/ionicAuth/reset_password.html",
                    controller : 'ResetPasswordCtrl'
                }
            }
        })
        .state('auth.change_pass', {
            url  : "/change_pass",
            views: {
                auth: {
                    templateUrl: "views/ionicAuth/change_pass.html",
                    controller : 'ChangePassCtrl'
                }
            }
        });
});

angular.module('ionicAuth').run(function ($rootScope, user, $http, formlyConfig, formlyValidationMessages) {
    $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $http.defaults.headers.common['X-Master-General-Key'] = 'U2FsdGVkX19PQ0Z0ka4thG2tWSLS375F';
    user.start();

    // formly config
    //formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

    formlyValidationMessages.addStringMessage('required', 'This field is required');

});