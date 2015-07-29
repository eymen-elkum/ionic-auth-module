'use strict';

angular.module('ionicAuth').service('registerForm', function () {
    return {
        form: function () {
            return {
                model : {},
                fields: [
                    {
                        key            : 'username',
                        type           : 'input',
                        templateOptions: {
                            type             : 'text',
                            placeholder      : 'Misal: Seref Koca',
                            "icon"           : "ion-person",
                            "iconPlaceholder": true,
                            required         : true
                        }
                    },
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
                    },
                    {
                        key            : 'password-2',
                        type           : 'input',
                        templateOptions: {
                            type           : 'password',
                            placeholder    : 'Repeat your password again',
                            iconPlaceholder: true,
                            icon           : "ion-locked",
                            required       : true
                        }
                    }
                ]
            }
        }
    }
});
