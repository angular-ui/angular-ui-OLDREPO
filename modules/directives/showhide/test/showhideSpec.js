/*global beforeEach, afterEach, describe, it, inject, expect, module, spyOn, CodeMirror, angular, $*/

(function () {
    'use strict';

    describe('uiShow', function () {

        var scope, $compile;
        beforeEach(module('ui'));
        beforeEach(inject(function (_$rootScope_, _$compile_) {
            scope = _$rootScope_.$new();
            $compile = _$compile_;
        }));

        describe('when the directive is linked', function () {
            it('should call scope.$watch', function () {
                spyOn(scope, '$watch');
                $compile('<div ui-show="true"></div>')(scope);
                expect(scope.$watch).toHaveBeenCalled();
            });
        });

        describe('when a watch fires', function () {
            it('should add the ui-show class if true', function () {
                var element = $compile('<div ui-show="foo"></div>')(scope);
                scope.foo = true;
                scope.$apply();
                expect(element.hasClass('ui-show')).toBe(true);
            });
            it('should remove the ui-show class if false', function () {
                var element = $compile('<div ui-show="foo"></div>')(scope);
                scope.foo = false;
                scope.$apply();
                expect(element.hasClass('ui-show')).toBe(false);
            });
        });
    });
})();