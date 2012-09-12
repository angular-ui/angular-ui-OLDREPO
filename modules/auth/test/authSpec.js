/*
 * sample unit testing for sample templates and implementations
 */
describe('uiAuth', function () {

  // declare these up here to be global to all tests
  var $rootScope, uiConfig = angular.module('ui.config');

  beforeEach(module('ui.auth'));

  // inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
  // otherwise, you would need to inject these into each test
  beforeEach(inject(function (_$rootScope_, _$http_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;

    // backend definition common for all tests
    $httpBackend.when('POST', '/login').respond(200, '');
  }));

  afterEach(function () {
    uiConfig.value('ui.config', {});
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should emit unauthenticated if 401 returned', function () {
    $httpBackend.when('POST', '/error').respond(401, '');
    expect(false).toBeTruthy();
  });

  describe('authenticated()', function() {
    it('should emit "ui:authenticated"', function () {
      expect(false).toBeTruthy();
    });
    it('should retry all buffered requests', function () {
      expect(false).toBeTruthy();
    });
    it('should ignore buferred requests when passing true', function () {
      expect(false).toBeTruthy();
    });
  });

});
