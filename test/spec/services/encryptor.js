'use strict';

describe('Service: Encryptor', function () {

  // load the service's module
  beforeEach(module('authApp'));

  // instantiate service
  var Encryptor;
  beforeEach(inject(function (_Encryptor_) {
    Encryptor = _Encryptor_;
  }));

  it('should do something', function () {
    expect(!!Encryptor).toBe(true);
  });

});
