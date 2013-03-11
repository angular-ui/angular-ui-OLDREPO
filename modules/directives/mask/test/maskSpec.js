describe('uiMask', function () {

  var staticMaskHtml = "<input ui-mask='(9)9' ng-model='x'>";
  var dynamicMaskHtml = "<input ui-mask='{{mask}}' ng-model='x'>";
  var compileElement, scope;

  beforeEach(module('ui.directives'));
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    compileElement = function(html) {
      return $compile(html)(scope);
    };
  }));

  describe('ui changes on model changes', function () {
    it('should update ui valid model value', function () {
      var element = compileElement(staticMaskHtml);
      scope.$digest();
      expect(element.val()).toBe('(_)_');
      scope.$apply('x = 12');
      expect(element.val()).toBe('(1)2');
    });
    it('should wipe out ui on invalid model value', function () {
      var element = compileElement(staticMaskHtml);
      scope.$apply('x = 12');
      expect(element.val()).toBe('(1)2');
      scope.$apply('x = 1');
      expect(element.val()).toBe('');
    });
  });

  describe('interpolated masks', function() {
    it('should allow mask to change', function() {
      var element = compileElement(dynamicMaskHtml);
      scope.$apply('mask = "(99)99"; x = 1234');
      expect(element.val()).toBe('(12)34');
      scope.$apply('mask = "(9)9"');
      expect(element.val()).toBe('(1)2');
    });
  });

  xdescribe('model binding on ui change', function () {
    it('should change model when element value changes', function() {
      var element = compileElement(staticMaskHtml);
      element.val('(2)4');
      element.trigger('blur');
      expect(scope.x).toBe(24);
    });
  });

});