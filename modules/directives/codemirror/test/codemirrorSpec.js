/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, CodeMirror*/
describe('uiCodemirror', function () {
    'use strict';

    var scope;
    beforeEach(module('ui'));
    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));
    afterEach(function () {
        scope.$destroy();
    });
    describe('compiling this directive', function () {
        it('should throw an error if used against a non-textarea', function () {
            inject(function ($compile) {
                function compile() {
                    $compile('<div ui-codemirror ng-model="foo"></div>')(scope);
                }

                expect(compile).toThrow();
            });
        });
        it('should not throw an error when used against a textarea', function () {
            inject(function ($compile) {
                function compile() {
                    $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                }

                expect(compile).not.toThrow();
            });
        });
        it('should throw an error when no ngModel attribute defined', function () {
            inject(function ($compile) {
                function compile() {
                    $compile('<textarea ui-codemirror></textarea>')(scope);
                }

                expect(compile).toThrow();
            });
        });
        it('should watch the uiCodemirror attribute', function () {
            inject(function ($compile) {
                spyOn(scope, '$watch');
                $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                expect(scope.$watch).toHaveBeenCalled();
            });
        });
    });
    describe('when the model changes', function () {
        it('should update the IDE', function () {
            inject(function ($compile) {
                var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                scope.foo = 'bar';
                scope.$apply();
                expect(element.siblings().text().trim()).toBe(scope.foo);
            });
        });
    });
    describe('when the IDE changes', function () {
        it('should update the model', function () {
            inject(function ($compile) {
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
    });
    describe('when the model is falsy', function () {
        it('should update the IDE with an empty string', function () {
            inject(function ($compile) {
                var codemirror,
                    fromTextArea = CodeMirror.fromTextArea;
                spyOn(CodeMirror, 'fromTextArea').andCallFake(function () {
                    codemirror = fromTextArea.apply(this, arguments);
                    return codemirror;
                });
                var element = $compile('<textarea ui-codemirror ng-model="foo"></textarea>')(scope);
                scope.$apply();
                expect(scope.foo).toBe(undefined);
                expect(element.siblings().text().trim()).toBe('');
            });
        });
    });
});