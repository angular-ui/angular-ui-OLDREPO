/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, CodeMirror, angular, $*/
describe('uiCodemirror', function () {
  'use strict';

  var scope, $compile;
  beforeEach(function () {
    // throw some garbage in the codemirror cfg to be sure it's getting thru to the directive
    angular.module('ui.config').value('ui.config', {codemirror: {bar: 'baz'}});
  });
  beforeEach(module('ui'));
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    angular.module('ui.config').value('ui.config', {}); // cleanup
  });

  describe('compiling this directive', function () {
    it('should throw an error if used against a non-textarea', function () {
      function compile() {
        $compile('<div ui-codemirror ng-model="foo"></div>')(scope);
      }

      expect(compile).toThrow();
    });

    it('should not throw an error when used against a textarea', function () {
      function compile() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      }

      expect(compile).not.toThrow();
    });

    it('should throw an error when no ngModel attribute defined', function () {
      function compile() {
        $compile('<textarea ui-codemirror></textarea>')(scope);
      }

      expect(compile).toThrow();
    });

    it('should watch the uiCodemirror attribute', function () {
      spyOn(scope, '$watch');
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      expect(scope.$watch).toHaveBeenCalled();
    });

    it('should include the passed options', function () {
      spyOn(CodeMirror, 'fromTextArea');
      $compile('<textarea ui-codemirror="{foo: \'bar\'}" ng-model="foo"></textarea>')(scope);
      expect(CodeMirror.fromTextArea.mostRecentCall.args[1].foo).toEqual('bar');
    });

    it('should include the default options', function () {
      spyOn(CodeMirror, 'fromTextArea');
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      expect(CodeMirror.fromTextArea.mostRecentCall.args[1].bar).toEqual('baz');
    });
  });

  describe('when the model changes', function () {
    it('should update the IDE', function () {
      var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      scope.foo = 'bar';
      scope.$apply();
      expect($.trim(element.siblings().text())).toBe(scope.foo);
    });
  });

  describe('when the IDE changes', function () {
    it('should update the model', function () {
      var codemirror,
        fromTextArea = CodeMirror.fromTextArea;
      spyOn(CodeMirror, 'fromTextArea').andCallFake(function () {
        codemirror = fromTextArea.apply(this, arguments);
        return codemirror;
      });
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      scope.foo = 'bar';
      scope.$apply();
      var value = 'baz';
      codemirror.setValue(value);
      expect(scope.foo).toBe(value);
    });
  });

  describe('when the model is undefined/null', function () {
    it('should update the IDE with an empty string', function () {
      var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
      scope.$apply();
      expect(scope.foo).toBe(undefined);
      expect($.trim(element.siblings().text())).toBe('');
      scope.foo = null;
      scope.$apply();
      expect(scope.foo).toBe(null);
      expect($.trim(element.siblings().text())).toBe('');
    });
  });

  describe('when the model is an object or an array', function () {
    it('should throw an error', function () {
      function compileWithObject() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
        scope.foo = {};
        scope.$apply();
      }

      function compileWithArray() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
        scope.foo = [];
        scope.$apply();
      }

      expect(compileWithObject).toThrow();
      expect(compileWithArray).toThrow();
    });
  });
});