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

  function setPath(path) {
    $location.path(path);
    scope.$broadcast('$routeChangeSuccess');
    scope.$apply();
  }

  describe('with uiRoute defined', function(){
    it('should use the uiRoute property', function(){
      $compile('<div ui-route="/foo" />')(scope);
    });
    it('should update $uiRoute on $observe', function(){
      setPath('/bar');
      scope.$apply('foobar = "foo"');
      $compile('<div ui-route="/{{foobar}}" />')(scope);
      expect(scope.$uiRoute).toBeFalsy();
      scope.$apply('foobar = "bar"');
      expect(scope.$uiRoute).toBe(true);
      scope.$apply('foobar = "foo"');
      expect(scope.$uiRoute).toBe(false);
    });
    it('should support regular expression', function(){
      setPath('/foo/123');
      $compile('<div ui-route="/foo/[0-9]*" />')(scope);
      expect(scope.$uiRoute).toBe(true);
    });
  });

  describe('with ngHref defined', function(){

    iit('should use the ngHref property', function(){
      setPath('/foo');
      $compile('<a ng-href="/foo" ui-route />')(scope);
      expect(scope.$uiRoute).toBe(true);
    });
    it('should update $uiRoute on $observe', function(){
      setPath('/bar');
      scope.$apply('foobar = "foo"');
      $compile('<a ng-href="/{{foobar}}" ui-route />')(scope);
      expect(scope.$uiRoute).toBeFalsy();
      scope.$apply('foobar = "bar"');
      expect(scope.$uiRoute).toBe(true);
      scope.$apply('foobar = "foo"');
      expect(scope.$uiRoute).toBe(false);
    });
  });

  describe('with href defined', function(){

    it('should use the href property', function(){
      setPath('/foo');
      $compile('<a href="/foo" ui-route />')(scope);
      expect(scope.$uiRoute).toBe(true);
    });
  });

  it('should throw an error if no route property available', function(){
    expect(function(){
      $compile('<div ui-route/>')(scope);
    }).toThrow();
  });

  it('should update $uiRoute on route change', function(){
    setPath('/bar');
    $compile('<div ui-route="/foo" />')(scope);
    expect(scope.$uiRoute).toBeFalsy();
    setPath('/foo');
    expect(scope.$uiRoute).toBe(true);
    setPath('/bar');
    expect(scope.$uiRoute).toBe(false);
  });
});