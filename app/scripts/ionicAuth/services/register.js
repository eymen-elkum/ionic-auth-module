'use strict';

/**
 * @ngdoc service
 * @name authApp.register
 * @description
 * # register
 * Service in the authApp.
 */
angular.module('ionicAuth').service('registerService', function ($rootScope, $ionicModal, registerForm, $http, authSetting, toastr) {

    var modal;
    var $scope = $rootScope.$new();

    function registerSuccess() {
        pr('registerSuccess');
        toastr.success('Congratulations: registration succeeded!','Tamam');
        modal.hide();
    }

    $scope.register = function () {
        $http.post(authSetting.root + 'users/register', $scope.form.model).success(function (result) {
            if (result.success) {
                registerSuccess();
            } else {
                //shw the errors
                angular.forEach(result.errors, function (val, key) {
                    var msg = '<ul>';
                    angular.forEach(val, function (val, key) {
                        msg += '<li>'+val+'</li>'
                        pr('key: ' + key)
                        pr('val: ' + val)
                    })
                    msg += '</ul>';
                    toastr.error(msg, key);
                });
                $scope.errors = result.errors;
            }
        }).error(function (error) {
            pr(error);
        });
    }

    $scope.form = registerForm.form();

    function openModal() {
        $ionicModal.fromTemplateUrl('views/register.html', {
            scope: $scope
        }).then(function (modalObj) {
            modal = modalObj;
            $scope.close = function () {
                modal.hide();
            }
            $scope.$on('modal.hidden', function () {
                setTimeout(function () {
                    modal.remove();
                }, 100)
            });
            modal.show();
        })
    }

    return {
        open: function () {
            openModal();
        }
    }
});
