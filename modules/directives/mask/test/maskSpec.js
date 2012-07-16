
describe('uiMask', function() {
  beforeEach(module('ui.directives'));
  return describe('simple use on input element', function() {
    return it('should have a mask attached', function() {
      return inject(function($compile, $rootScope) {
        var element;
        $rootScope.$apply(function() {
          return $rootScope.x = 1234567890;
        });
        element = $compile("<input ui-mask=\"'(999).999-9999'\" placeholder=\"(___).___-____\" ng-model='x'></input>")($rootScope);
        return expect(element).toBeDefined();
      });
    });
  });
});
