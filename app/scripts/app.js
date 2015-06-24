'use strict';

function pr(o) {
    console.log('--------------------------------------------------------')
    console.log(o)
    console.log('--------------------------------------------------------')
}
function er(o) {
    console.log('--------------------------------------------------------')
    console.warn(o)
    console.log('--------------------------------------------------------')
}
angular.module('authApp', ['ui.router', 'ionic', 'LocalStorageModule', 'ngAuth-buffer','ngAnimate']);
angular.module('authApp').config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {

    $httpProvider.interceptors.push('auth_interceptor');

    localStorageServiceProvider.setPrefix('app.auth');

    $stateProvider
        .state('app', {
            url     : "/app",
            template: "<ion-nav-view name='app'></ion-nav-view>",
            abstract: true
            //controller: 'MainCtrl'
        })
        .state('app.main', {
            url  : "/main",
            views: {
                app: {
                    controller : 'MainCtrl',
                    templateUrl: "views/main.html"
                }
            }
        })
        .state('app.public', {
            url  : "/public",
            views: {
                app: {
                    controller : 'PublicCtrl',
                    templateUrl: "views/public.html"
                }
            }
        })
        .state('app.private', {
            url  : "/private",
            views: {
                app: {
                    controller : 'PrivateCtrl',
                    templateUrl: "views/private.html"
                }
            }
        })
        .state('auth', {
            url     : "/auth",
            template: "<ion-nav-view name='auth'></ion-nav-view>",
            abstract: true
            //controller: 'MainCtrl'
        })
        .state('auth.login', {
            url  : "/login",
            views: {
                auth: {
                    templateUrl: "views/login.html",
                    controller : 'LoginCtrl'
                }
            }
        })
        .state('auth.register', {
            url  : "/register",
            views: {
                auth: {
                    templateUrl: "views/register.html",
                    controller : 'RegisterCtrl'
                }
            }
        })
        .state('auth.profile', {
            url  : "/profile",
            views: {
                auth: {
                    templateUrl: "views/profile.html",
                    controller : 'ProfileCtrl'
                }
            }
        })
        .state('auth.reset_password', {
            url  : "/reset_password",
            views: {
                auth: {
                    templateUrl: "views/reset_password.html",
                    controller : 'ResetPasswordCtrl'
                }
            }
        })
        .state('auth.change_pass', {
            url  : "/change_pass",
            views: {
                auth: {
                    templateUrl: "views/change_pass.html",
                    controller : 'ChangePassCtrl'
                }
            }
        });

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/app/main");

});

angular.module('authApp').run(function (user) {
    user.start();
});