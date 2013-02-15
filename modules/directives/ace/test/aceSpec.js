
describe('uiAce', function () {
	'use strict';

	// declare these up here to be global to all tests
	var scope, $compile, uiConfig = angular.module('ui.config');

	beforeEach(module('ui.directives'));
	beforeEach(function () {
		uiConfig.value('ui.config', {ace: {showGutter: false}});
	});

	// inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
	// otherwise, you would need to inject these into each test
	beforeEach(inject(function (_$rootScope_, _$compile_ ) {
		scope = _$rootScope_.$new();
		$compile = _$compile_;
	}));

	afterEach(function () {
		uiConfig.value('ui.config', {}); // cleanup
	});

	describe('behavior', function () {

		it('should not throw an error when window.ace is defined', function () {
			function compile() {
				$compile('<div ui-ace>')(scope);
			}
			expect(compile).not.toThrow();
		});
		
		it('should be wrapped with .ace_editor_wrapper', function () {
			var element = $compile('<div ui-ace>')(scope);
			expect(element.parent().hasClass('ace_editor_wrapper')).toBeTruthy();
		});

		
		it('should watch the uiAce attribute', function () {
			spyOn(scope, '$watch');
			$compile('<div ui-ace ng-model="foo">')(scope);
			expect(scope.$watch).toHaveBeenCalled();
		});
		
	});

	describe('instance', function () {
		var _ace;


		beforeEach(function () {
			var aceEditFunction = ace.edit;
			spyOn(ace, 'edit').andCallFake(function () {
				_ace = aceEditFunction.apply(this, arguments);
				return _ace;
			});
		});

		it('should call ace.edit', function () {
			$compile('<div ui-ace>')(scope);
			expect(_ace).toBeDefined();
		});

		describe('options', function () {
			describe('passed', function () {
				it('should show the showGutter', function () {
					$compile('<div ui-ace="{showGutter:true}">')(scope);
					expect(_ace.renderer).toBeDefined();
					expect(_ace.renderer.getShowGutter()).toBeTruthy();
				});
			});
			describe('global', function () {
				it('should hide the showGutter', function () {
					$compile('<div ui-ace>')(scope);
					expect(_ace.renderer).toBeDefined();
					expect(_ace.renderer.getShowGutter()).toBeFalsy();
				});
			});
		});

		describe('when the model changes', function () {
			it('should update the IDE', function () {
				$compile('<div ui-ace ng-model="foo">')(scope);
				scope.$apply("foo = 'bar'");
				expect(_ace.getSession().getValue()).toBe(scope.foo);
			});
		});

		describe('when the IDE changes', function () {
			it('should update the model', function () {
				$compile('<div ui-ace ng-model="foo">')(scope);
				scope.$apply("foo = 'bar'");

				var value = 'baz';
				_ace.getSession().setValue(value);
				expect(scope.foo).toBe(value);
			});
		});

		describe('when the model is undefined/null', function () {
			it('should update the IDE with an empty string', function () {
				$compile('<div ui-ace ng-model="foo">')(scope);
				scope.$apply();
				expect(scope.foo).toBeUndefined()
				expect(_ace.getSession().getValue()).toBe('');
				scope.$apply('foo = "bar"');
				expect(scope.foo).toBe('bar');
				expect(_ace.getSession().getValue()).toBe('bar');
				scope.$apply('foo = null');
				expect(scope.foo).toBe(null);
				expect(_ace.getSession().getValue()).toBe('');
			});
		});

		describe('when the callback is not a function', function () {
			it('should throw an error', function () {
				function compileWithObject() {
					scope.changing = {};
					scope.$apply("foo = 'bar'");
					$compile('<div ui-ace="{onChange: changing}" ng-model="foo">')(scope);
					_ace.getSession().setValue("baz");
				}

				expect(compileWithObject).toThrow();
			});
		});
	});

	describe('when the model is an object or an array', function () {
		it('should throw an error', function () {
			function compileWithObject() {
				$compile('<div ui-ace ng-model="foo">')(scope);
				scope.foo = {};
				scope.$apply();
			}

			function compileWithArray() {
				$compile('<div ui-ace ng-model="foo">')(scope);
				scope.foo = [];
				scope.$apply();
			}

			expect(compileWithObject).toThrow();
			expect(compileWithArray).toThrow();
		});
	});

	
});