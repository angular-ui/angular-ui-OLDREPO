describe('uiJq', function () {
  var scope;
  scope = null;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  describe('function or plugin isn\'t found', function () {
    it('should throw an error', function () {
      inject(function ($compile) {
        expect(function () {
          $compile("<div ui-jq='failure'></div>")(scope);
        }).toThrow();
      });
    });
  });
  describe('calling a jQuery element function', function () {
    it('should just like, sort of work and junk', function () {
      inject(function ($compile) {
        $.fn.success = function () {
        };
        spyOn($.fn, 'success');
        $compile("<div ui-jq='success'></div>")(scope);
        expect($.fn.success).toHaveBeenCalled();
      });
    });
  });
});
