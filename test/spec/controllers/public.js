'use strict';

describe('Controller: PublicCtrl', function () {

  // load the controller's module
  beforeEach(module('authApp'));

  var PublicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PublicCtrl = $controller('PublicCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
