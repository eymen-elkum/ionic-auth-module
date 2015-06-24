'use strict';

describe('Service: resetPass', function () {

  // load the service's module
  beforeEach(module('authApp'));

  // instantiate service
  var resetPass;
  beforeEach(inject(function (_resetPass_) {
    resetPass = _resetPass_;
  }));

  it('should do something', function () {
    expect(!!resetPass).toBe(true);
  });

});
