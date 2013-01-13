describe('uiJq', function () {
  var scope, compile;
  scope = null;
  beforeEach(module('ui.directives'));
  beforeEach(function () {
    module(function ($provide) {
      $provide.value('ui.config', {
        jq: {foo: {}}
      });
    });
  });
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));
  describe('function or plugin isn\'t found', function () {
    it('should throw an error', function () {
      expect(function () {
        compile("<div ui-jq='failure'></div>")(scope);
      }).toThrow();
    });
  });
  describe('calling a jQuery element function', function () {
    it('should just like, sort of work and junk', function () {
      jQuery.fn.success = function () {};
      spyOn(jQuery.fn, 'success');
      compile("<div ui-jq='success'></div>")(scope);
      expect(jQuery.fn.success).toHaveBeenCalled();
    });
  });
  describe('calling a jQuery element function with options', function() {
    it('should not copy options.pizza to global', function() {
      jQuery.fn.foo = function () {};
      spyOn(jQuery.fn, 'foo');
      compile('<div ui-jq="foo" ui-options="{pizza:true}"></div><div ui-jq="foo" ui-options="{}"></div>')(scope);
      expect(jQuery.fn.foo.calls[0].args).toEqual([{pizza: true}]);
      expect(jQuery.fn.foo.calls[1].args).toEqual([{}]);
    });
  });
  describe('using ui-refresh', function() {
    it('should execute exactly once if the expression is never set', function() {
      jQuery.fn.foo = function () {
        console.log('test');
      };
      spyOn(jQuery.fn, 'foo');
      compile('<div ui-jq="foo" ui-refresh="bar"></div>')(scope);
      expect(jQuery.fn.foo.callCount).toBe(1);
    });
    it('should execute exactly once if the expression is set at initialization', function() {
      jQuery.fn.foo = function () {};
      spyOn(jQuery.fn, 'foo');
      scope.bar = true;
      compile('<div ui-jq="foo" ui-refresh="bar"></div>')(scope);
      expect(jQuery.fn.foo.callCount).toBe(1);
    });
    it('should execute once for each time the expression changes', function() {
      jQuery.fn.foo = function () {};
      spyOn(jQuery.fn, 'foo');
      scope.bar = 1;
      compile('<div ui-jq="foo" ui-refresh="bar"></div>')(scope);
      expect(jQuery.fn.foo.callCount).toBe(1);
      scope.$apply('bar++');
      expect(jQuery.fn.foo.callCount).toBe(2);
      scope.$apply('bar++');
      expect(jQuery.fn.foo.callCount).toBe(3);
    });
  });
  describe('passing uiChange to options', function() {
    it('should watch a form control change event and trigger an input event if true', function() {
      jQuery.fn.foo = function () {};
      var bar = false;
      var element = compile('<input ui-jq="foo">')(scope);
      element.bind('input', function(){
        bar = true;
      })
      element.trigger('change');
      expect(bar).toBe(true);
    });
    it('should not watch a form control change event and trigger an input event if false', function() {
      jQuery.fn.foo = function () {};
      var bar = false;
      var element = compile('<input ui-jq="foo" ui-options="{uiChange:false}">')(scope);
      element.bind('input', function(){
        bar = true;
      })
      element.trigger('change');
      expect(bar).toBe(false);
    });
    it('should not watch non-form controls', function() {
      jQuery.fn.foo = function () {};
      var bar = false;
      var element = compile('<div ui-jq="foo"></div>')(scope);
      element.bind('input', function(){
        bar = true;
      })
      element.trigger('change');
      expect(bar).toBe(false);
    });
  });
});
