'use strict';

angular.module('testApp', ['ui.router', 'ionic','ionicAuth']);
angular.module('testApp').config(function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, toastrConfig) {

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
        });

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/app/main");

});

angular.module('testApp').run(function ($rootScope, $http, formlyConfig, formlyValidationMessages) {
    pr('test app started')
});