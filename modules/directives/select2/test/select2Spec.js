/*global describe, beforeEach, module, inject, it, spyOn, expect, $ */
describe('uiSelect2', function () {
  'use strict';

  var scope, $compile, options;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$window_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    scope.options = {
      query: function (query) {
        var data = {
          results: [{ id: 1, text: 'first' }]
        };
        query.callback(data);
      }
    };
  }));

  describe('with a select element', function () {
    describe('compiling this directive', function () {
      it('should throw an error if we have no model defined', function () {
        function compile() {
          $compile('<select type="text" ui-reset></select>')(scope);
        }
        expect(compile).toThrow();
      });
      it('should proper DOM structure', function () {
        scope.foo = 'bar';
        scope.$digest();
        var element = $compile('<select ui-select2 ng-model="foo"></select>')(scope);
        // DOM is created asynchronously
        //expect(element.next().is('div.select2-container')).toBe(true);
      });
    });
    it('should observe the disabled attribute', function () {
      var element = $compile('<select ui-select2 ng-model="foo" ng-disabled="disabled"></select>')(scope);

      //expect(element.next().hasClass('select2-container-disabled')).toBe(false);
      //scope.$apply(function(){
      //  scope.disabled = true;
      //});
      //expect(element.next().hasClass('select2-container-disabled')).toBe(true);
      //scope.$apply(function(){
      //  scope.disabled = false;
      //});
      //expect(element.next().hasClass('select2-container-disabled')).toBe(false);
    });
    it('should observe the multiple attribute', function () {
      var element = $compile('<select ui-select2 ng-model="foo" ng-multiple="multiple"></select>')(scope);

      //expect(element.next().hasClass('select2-container-multi')).toBe(false);
      //scope.$apply(function(){
      //  scope.multiple = true;
      //});
      //expect(element.next().hasClass('select2-container-multi')).toBe(true);
      //scope.$apply(function(){
      //  scope.multiple = false;
      //});
      //expect(element.next().hasClass('select2-container-multi')).toBe(false);
    });
  });
  describe('with an input element', function () {
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
        var element = $compile('<input ui-select2="options" ng-model="foo"/>')(scope);
        // DOM is created asynchronously
        // expect(element.next().is('div.select2-container')).toBe(true);
      });
    });
  });
});