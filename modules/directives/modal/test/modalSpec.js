describe('modal', function () {
  var elm, scope, $timeout;

  beforeEach(module('ui.directives'));

  beforeEach(inject(function ($injector, $rootScope, $compile) {
    scope = $rootScope;
    $timeout = $injector.get('$timeout');
    elm = $compile(
      '<div ui-modal ng-model="modalShown">'
    )($rootScope);
  }));

  it('should add "modal hide" class for you', function () {
    expect(elm.hasClass("modal hide")).toBe(true);
  });

  describe('model change', function () {
    it('should open modal', function () {
      scope.$apply(function () {
        scope.modalShown = true;
      });
      $timeout.flush();
      expect(elm.hasClass('in')).toBe(true);
    });

    it('should close modal', function () {
      scope.$apply(function () {
        scope.modalShown = false;
      });
      $timeout.flush();
      expect(elm.hasClass('in')).toBe(false);
    });
  });

  describe('open/close events', function () {
    it('should set model true when modal opens', function () {
      elm.modal('show');
      expect(scope.modalShown).toBeUndefined();
      $timeout.flush();
      expect(scope.modalShown).toBe(true);
    });

    it('should set model false when modal closes', function () {
      elm.modal('hide');
      expect(scope.modalShown).toBeUndefined();
      $timeout.flush();
      expect(scope.modalShown).toBe(false);
    });
  });
});
