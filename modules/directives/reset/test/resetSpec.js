/*global describe, beforeEach, module, inject, it, spyOn, expect, $ */
describe('uiReset', function () {
  'use strict';

  var scope, $compile;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$window_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('compiling this directive', function () {
    it('should throw an error if we have no model defined', function () {
      function compile() {
        $compile('<input type="text" ui-reset/>')(scope);
      }

      expect(compile).toThrow();
    });
    it('should proper DOM structure', function () {
      scope.foo = 'bar';
      scope.$digest();
      var element = $compile('<input type="text" ui-reset ng-model="foo"/>')(scope);
      expect(element.parent().is('span')).toBe(true);
      expect(element.next().is('a')).toBe(true);
    });
  });
  describe('clicking on the created anchor tag', function () {
    it('should prevent the default action', function () {
      var element = $compile('<input type="text" ui-reset ng-model="foo"/>')(scope);
      spyOn($.Event.prototype, 'preventDefault');
      element.siblings().get(0).click();
      expect($.Event.prototype.preventDefault).toHaveBeenCalled();
    });
    it('should clear the model and control value', function () {
      scope.foo = 'bar';
      var element = $compile('<input type="text" ui-reset ng-model="foo"/>')(scope);
      scope.$digest();
      expect(element.val()).toBe('bar');
      element.next().click();
      expect(scope.foo).toBe(null);
      expect(element.val()).toBe('');
    });
  });
});