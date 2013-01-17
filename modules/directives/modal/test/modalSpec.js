describe('modal', function () {
  var elm, scope, $timeout, $compile;

  beforeEach(module('ui.directives'));

  beforeEach(inject(function ($injector, $rootScope, _$compile_) {
    scope = $rootScope;
    $timeout = $injector.get('$timeout');
    $compile = _$compile_;

    elm = $compile(
        '<div ui-modal ng-model="modalShown">'
    )(scope);

  }));

  it('should add "modal hide" class for you', function () {
    expect(elm.hasClass("modal hide")).toBe(true);
  });

  describe('unopened modal', function () {

    it('should open modal on model change', function () {
      scope.$apply(function () {
        scope.modalShown = true;
      });
      $timeout.flush();
      expect(elm.hasClass('in')).toBe(true);
    });

    it('should set model true when modal opens', function () {
      elm.modal('show');
      expect(scope.modalShown).toBeUndefined();
      $timeout.flush();
      expect(scope.modalShown).toBe(true);
    });

  });

  describe('opened modal', function () {
    beforeEach(function () {
      elm.modal('show');
      $timeout.flush();
    });

    it('should close an open modal on model change', function () {
      scope.$apply(function () {
        scope.modalShown = false;
      });
      $timeout.flush();
      expect(elm.hasClass('in')).toBe(false);
    });

    it('should set model false when modal closes', function () {
      elm.modal('hide');
      $timeout.flush();
      expect(scope.modalShown).toBe(false);
    });

  });

  describe('shown/hidden function', function () {
    beforeEach(function() {
      scope['shown'] = function () { };
      scope['hidden'] = function () { };
      spyOn(scope, 'shown');
      spyOn(scope, 'hidden');

      elm = $compile(
          '<div ui-modal="{onShown:shown,onHidden:hidden}" ng-model="modalShown">'
      )(scope);
    });

    it('should call onShown function when modal is shown', function () {
      elm.modal('show');
      $timeout.flush();
      expect(scope.shown).toHaveBeenCalled();
    });

    it('should call onHidden function when open modal is hidden', function () {
      elm.modal('show');
      $timeout.flush();
      elm.modal('hide');
      $timeout.flush();
      expect(scope.hidden).toHaveBeenCalled();
    });
  })
});
