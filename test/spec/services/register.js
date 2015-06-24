'use strict';

describe('Service: register', function () {

  // load the service's module
  beforeEach(module('authApp'));

  // instantiate service
  var register;
  beforeEach(inject(function (_register_) {
    register = _register_;
  }));

  it('should do something', function () {
    expect(!!register).toBe(true);
  });

});
