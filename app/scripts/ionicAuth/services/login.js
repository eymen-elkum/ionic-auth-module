'use strict';

/**
 * @ngdoc service
 * @name authApp.login
 * @description
 * # login
 * Service in the authApp.
 */
angular.module('ionicAuth').service('loginService', function ($rootScope, $ionicModal, $ionicHistory, user, httpBuffer, registerService) {
    var modal;
    var $scope = $rootScope.$new();

    $scope.user = user.getUser();
    $scope.form = {
        model : user.getUser(),
        fields: [
            {
                key            : 'email',
                type           : 'input',
                templateOptions: {
                    type             : 'email',
                    placeholder      : 'Type your email here!',
                    "icon"           : "ion-at",
                    "iconPlaceholder": true,
                    required         : true
                }
            },
            {
                key            : 'password',
                type           : 'input',
                templateOptions: {
                    type           : 'password',
                    placeholder    : 'Type your password here',
                    iconPlaceholder: true,
                    icon           : "ion-locked",
                    required       : true
                }
            }
        ]
    };

    $scope.login = function () {
        user.login($scope.form.model);
    }

    $rootScope.$on('$ionicView.beforeEnter', function (varr) {
            pr(varr);
            if(modal && modal._isShown){
                pr('YYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
                modal.hide();
            }
        }
    );

    $scope.register = function () {
        registerService.open();
    }

    $scope.$on('event:auth-loginConfirmed', function (data) {
        modal.hide();
    });

    return {
        login: function () {
            $ionicModal.fromTemplateUrl('views/ionicAuth/login.html', {
                scope: $scope
            }).then(function (modalObj) {
                modal = modalObj;
                $scope.close = function () {
                    $ionicHistory.goBack();
                    httpBuffer.rejectAll(false);
                    $rootScope.$broadcast('event:auth-loginCancelled', {});
                    modal.hide();
                }
                $scope.$on('modal.hidden', function () {
                    setTimeout(function () {
                        modal.remove();
                    }, 100)
                });
                modal.show();
            });
        }
    }
});
