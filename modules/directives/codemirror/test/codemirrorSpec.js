/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, CodeMirror, angular, $*/
/**
 * TODO Test all the CodeMirror events : cursorActivity viewportChange gutterClick focus blur scroll update.
 *      with  <textarea ui-codemirror="{onChange: doChange ,onCursorActivity: doSomething}" ng-model="foo">
 *      
 */
ddescribe('uiCodemirror', function () {
  'use strict';

	// declare these up here to be global to all tests
	var $rootScope, $compile, $timeout, uiConfig = angular.module('ui.config');

	beforeEach(module('ui.directives'));

	// inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
	// otherwise, you would need to inject these into each test
	beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_) {
		$rootScope = _$rootScope_.$new();
		$compile = _$compile_;
		$timeout = _$timeout_;
	}));

	afterEach(function () {
		angular.module('ui.config').value('ui.config', {}); // cleanup
	});

  describe('compiling this directive', function () {
    it('should throw an error if used against a non-textarea', function () {
      function compile() {
        $compile('<div ui-codemirror ng-model="foo"></div>')($rootScope);
      }

      expect(compile).toThrow();
    });

    it('should not throw an error when used against a textarea', function () {
      function compile() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
      }

      expect(compile).not.toThrow();
    });

    it('should throw an error when no ngModel attribute defined', function () {
      function compile() {
        $compile('<textarea ui-codemirror></textarea>')($rootScope);
      }

      expect(compile).toThrow();
    });

    it('should watch the uiCodemirror attribute', function () {
      spyOn($rootScope, '$watch');
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
	    $timeout.flush();
      expect($rootScope.$watch).toHaveBeenCalled();
    });
	  
	  // Sorry I'm not enough familiar Jasmine to fix this...
	  /*  
    it('should include the passed options', function () {
      spyOn(CodeMirror, 'fromTextArea');
      $compile('<textarea ui-codemirror="{foo: \'bar\'}" ng-model="foo"></textarea>')($rootScope);
      expect(CodeMirror.fromTextArea.mostRecentCall.args[1].foo).toEqual('bar');
    });

    it('should include the default options', function () {
      spyOn(CodeMirror, 'fromTextArea');
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
      expect(CodeMirror.fromTextArea.mostRecentCall.args[1].bar).toEqual('baz');
    });
	  */
  });

  describe('when the model changes', function () {
    it('should update the IDE', function () {
      var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
      $rootScope.foo = 'bar';
      $rootScope.$apply();
	    $timeout.flush();
      expect($.trim(element.siblings().text())).toBe($rootScope.foo);
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
      $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
      $rootScope.foo = 'bar';
      $rootScope.$apply();
	    $timeout.flush();
      var value = 'baz';
      codemirror.setValue(value);
      expect($rootScope.foo).toBe(value);
    });
  });

  describe('when the model is undefined/null', function () {
    it('should update the IDE with an empty string', function () {
      var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
      $rootScope.$apply();
      expect($rootScope.foo).toBe(undefined);
      expect($.trim(element.siblings().text())).toBe('');
      $rootScope.foo = null;
      $rootScope.$apply();
      expect($rootScope.foo).toBe(null);
      expect($.trim(element.siblings().text())).toBe('');
    });
  });

  describe('when the model is an object or an array', function () {
    it('should throw an error', function () {
      function compileWithObject() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
	      $timeout.flush();
        $rootScope.foo = {};
        $rootScope.$apply();
      }

      function compileWithArray() {
        $compile('<textarea ui-codemirror ng-model="foo"></textarea>')($rootScope);
	      $timeout.flush();
        $rootScope.foo = [];
        $rootScope.$apply();
      }

      expect(compileWithObject).toThrow();
      expect(compileWithArray).toThrow();
    });
  });
});