'use strict';

describe('Controller: ConnectCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ConnectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConnectCtrl = $controller('ConnectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConnectCtrl.awesomeThings.length).toBe(3);
  });
});
