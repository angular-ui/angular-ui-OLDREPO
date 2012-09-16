/*global describe, beforeEach, module, inject, it, spyOn, expect, $, angular, afterEach, runs, waits */
describe('uiTinymce', function () {
  'use strict';

  var scope, $compile, element;
  beforeEach(module('ui'));
  beforeEach(function () {
    // throw some garbage in the tinymce cfg to be sure it's getting thru to the directive
    angular.module('ui.config').value('ui.config', {tinymce: {bar: 'baz'}});
  });
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    scope = _$rootScope_.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    angular.module('ui.config').value('ui.config', {}); // cleanup
  });

  /**
   * Asynchronously runs the compilation.
   */
  function compile() {
    runs(function () {
      element = $compile('<form><textarea name="foo" ui-tinymce="{foo: \'bar\'}" ng-model="foo"></textarea></form>')(scope);
    });
    waits(1);
  }

  describe('compiling this directive', function () {

    it('should include the passed options', function () {
      spyOn($.fn, 'tinymce');
      compile();
      runs(function () {
        expect($.fn.tinymce).toHaveBeenCalled();
        expect($.fn.tinymce.mostRecentCall.args[0].foo).toEqual('bar');
      });
    });

    it('should include the default options', function () {
      spyOn($.fn, 'tinymce');
      compile();
      runs(function () {
        expect($.fn.tinymce).toHaveBeenCalled();
        expect($.fn.tinymce.mostRecentCall.args[0].bar).toEqual('baz');
      });
    });
  });

});