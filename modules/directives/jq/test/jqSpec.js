describe('uiJq', function () {
  var scope;
  scope = null;
  beforeEach(module('ui.directives'));
  beforeEach(function () {
    module(function ($provide) {
      $provide.value('ui.config', {
        jq: {joe: {}}
      });
    });
  });
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
  describe('calling a jQuery element function with options', function() {
    it('should not copy options.pizza to global', function() {
      inject(function ($compile) {
        $.fn.joe = function () {
        };
        spyOn($.fn, 'joe');
        $compile('<div ui-jq="joe" ui-options="{pizza:true}"></div><div ui-jq="joe" ui-options="{}"></div>')(scope);
        expect($.fn.joe.calls[0].args).toEqual([{pizza: true}]);
        expect($.fn.joe.calls[1].args).toEqual([{}]);
      });
    });
  });
});
