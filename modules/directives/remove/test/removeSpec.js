/*global describe, beforeEach, module, inject, it, spyOn, expect */
describe('uiRemove', function () {
    'use strict';

    var scope, $compile;
    beforeEach(module('ui.directives'));
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
    }));

    describe('compiling this directive', function () {
        it('should watch the expression', function () {
            spyOn(scope, '$watch');
            scope.foo = true;
            scope.$apply();
            $compile('<div ui-remove="foo"></div>')(scope);
            expect(scope.$watch.mostRecentCall.args[0]).toBe('foo');
        });

        it('should set jQuery element data', function () {
            var element = $compile('<div ui-remove="foo"></div>')(scope);
            expect(element.data('ui-remove-index')).toBe(0);
        });
    });

    describe('changing the watch expression', function () {
        it('should remove the element from the DOM when true', function () {
            var element = $compile('<div><div id="foo" ui-remove="foo"></div><div id="bar"></div></div>')(scope);
            scope.foo = true;
            scope.$apply();
            expect(element.children().size()).toBe(1);
            expect(element.children().eq(0).attr('id')).toBe('bar');
        });

        it('should insert the element back into the DOM in the right place when false', function () {
            var element = $compile('<div><div id="foo" ui-remove="foo"></div><div id="bar"></div></div>')(scope);
            scope.foo = true;
            scope.$apply();
            scope.foo = false;
            scope.$apply();
            expect(element.children().size()).toBe(2);
            expect(element.children().eq(0).attr('id')).toBe('foo');
            expect(element.children().eq(1).attr('id')).toBe('bar');
        });
    });
    describe('when inserting back into the DOM', function () {
        it('should retain bound events', function () {
            var element = $compile('<div><div id="foo" ui-remove="foo"></div><div id="bar"></div></div>')(scope);
            var triggered = false;
            element.find("#foo").bind('some.trigger', function () {
                triggered = true;
            });
            scope.foo = true;
            scope.$apply();
            scope.foo = false;
            scope.$apply();
            element.find('#foo').trigger('some.trigger');
            expect(triggered).toBe(true);
        });
    });
});
