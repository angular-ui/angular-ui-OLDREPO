/*global describe, beforeEach, it, inject, expect, module, $*/
describe('uiAutocomplete', function() {
  'use strict';
  var source = ["javascript", "ruby", "c#", "haskell"];
  var options = {
	source: source
  }
  beforeEach(module('ui.directives'));
  describe('simple use on input element', function() {
    it('should have an autocomplete attached', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile("<input ui-autocomplete/>")($rootScope);
        expect(element.autocomplete()).toBeDefined();
      });
    });
	it('should update autocomplete term when the element value is changed', function() {
      inject(function($compile, $rootScope) {
        var term, element;
		term = "j";
        element = $compile("<input ui-autocomplete='{\"source\": [\"hej\"]}' ng-model='x'/>")($rootScope);
		element.val(term);
        expect(element.data("autocomplete").term).toEqual(term);
      });
    });
  });
});
