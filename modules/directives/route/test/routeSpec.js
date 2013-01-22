/*global describe, beforeEach, module, inject, it, spyOn, expect, $ */
describe('uiReset', function () {
  'use strict';

  var scope, $compile;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$window_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  describe('class toggle', function () {
    it('should be triggered by changing interpolation value', function () {
    });
    it('should be triggered by changing routes', function () {
    });
  });
  describe('element class', function () {
    it('should be "ui-active" by default', function () {
    });
    it('should value set in uiConfig', function () {
    });
  });
});