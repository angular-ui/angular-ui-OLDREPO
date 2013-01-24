/*global describe, beforeEach, module, inject, it, spyOn, expect, $ */
describe('uiRoute', function () {
  'use strict';

  var scope, $compile, $location;
  beforeEach(module('ui.directives'));
  beforeEach(inject(function (_$rootScope_, _$compile_, _$window_, _$location_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    $location = _$location_;
  }));

  describe('with uiRoute defined', function(){
    it('should use the uiRoute property', function(){
      $compile('<div ui-route="/foo" />')(scope);
    });
    it('should update $activeRoute on $observe', function(){
      $location.path('/bar');
      scope.$apply('foobar = "foo"');
      $compile('<div ui-route="/{{foobar}}" />')(scope);
      expect(scope.$activeRoute).toBeFalsy();
      scope.$apply('foobar = "bar"');
      expect(scope.$activeRoute).toBe(true);
      scope.$apply('foobar = "foo"');
      expect(scope.$activeRoute).toBe(false);
    });
    it('should support regular expression', function(){
      $location.path('/foo/123');
      $compile('<div ui-route="/foo/[0-9]*" />')(scope);
      expect(scope.$activeRoute).toBe(true);
    });
  });

  describe('with ngHref defined', function(){

    it('should use the ngHref property', function(){
      $location.path('/foo');
      $compile('<a ng-href="/foo" ui-route />')(scope);
      expect(scope.$activeRoute).toBe(true);
    });
    it('should update $activeRoute on $observe', function(){
      $location.path('/bar');
      scope.$apply('foobar = "foo"');
      $compile('<a ng-href="/{{foobar}}" ui-route />')(scope);
      expect(scope.$activeRoute).toBeFalsy();
      scope.$apply('foobar = "bar"');
      expect(scope.$activeRoute).toBe(true);
      scope.$apply('foobar = "foo"');
      expect(scope.$activeRoute).toBe(false);
    });
  });

  describe('with href defined', function(){

    it('should use the href property', function(){
      $location.path('/foo');
      $compile('<a href="/foo" ui-route />')(scope);
      expect(scope.$activeRoute).toBe(true);
    });
  });

  it('should throw an error if no route property available', function(){
    expect(function(){
      $compile('<div ui-route/>')(scope);
    }).toThrow();
  });

  it('should update $activeRoute on route change', function(){
    $location.path('/bar');
    $compile('<div ui-route="/foo" />')(scope);
    expect(scope.$activeRoute).toBeFalsy();
    $location.path('/foo');
    expect(scope.$activeRoute).toBe(true);
    $location.path('/bar');
    expect(scope.$activeRoute).toBe(false);
  });
});