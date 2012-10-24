
describe('uiTabs', function() {

  beforeEach(module('ui.directives'));

  describe('adding ui-tabs', function() {

    describe("with inline options", function() {

      var scope;
      var element;
      beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        element = $compile("<div ui-tabs='{tab1:{label:\"foo\"}}'><div></div></div>")(scope);
        scope.$apply();
      }));

      it('should add tabs to scope', function() {
        expect(scope.tabs).toBeDefined();
      });

      it('should add defined tab to tabs', function() {
          expect(scope.tabs.tab1).toBeDefined();
          expect(scope.tabs.tab1.label).toEqual("foo");
      });

      it('should insert ul element', function() {
        expect($('> ul', element).length).toEqual(1);
      });

      it('should insert ul element with nav and nav-tabs classes', function() {
        expect($('> ul', element).hasClass('nav')).toBeTruthy();
        expect($('> ul', element).hasClass('nav-tabs')).toBeTruthy();
      });

      it('should use the label as tab text', function() {
        expect($('> ul > li', element).text()).toEqual('foo');
      });
    });

    describe("with scoped options", function() {

      var scope;
      var element;
      beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        scope.getTabOptions = function(){ return {tab1:{label: "foo"}}; };
        element = $compile("<div ui-tabs='getTabOptions()'><div></div></div>")(scope);
        scope.$apply();
      }));

      it('should add tabs to scope', function() {
        expect(scope.tabs).toBeDefined();
      });

      it('should add defined tab to tabs', function() {
          expect(scope.tabs.tab1).toBeDefined();
          expect(scope.tabs.tab1.label).toEqual("foo");
      });

      it('should insert ul element', function() {
        expect($('> ul', element).length).toEqual(1);
      });

      it('should use the label as tab text', function() {
        expect($('> ul > li', element).text()).toEqual('foo');
      });
    });

  });

  describe("adding multiple tabs", function() {

    var scope;
    var element;
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      element = $compile("<div ui-tabs='{tab1:{label:\"foo\"}, tab2:{label:\"bar\"}}'><div></div><div></div></div>")(scope);
      scope.$apply();
    }));

    it('should activate only first tab', function() {
      var lis = $('> ul > li', element);
      expect($(lis[0]).hasClass('active')).toBeTruthy();
      expect($(lis[1]).hasClass('active')).toBeFalsy();
    });

    it('should activate only first tab in scope', function() {
      expect(scope.tabs.tab1.active).toBeTruthy();
      expect(scope.tabs.tab2.active).toBeFalsy();
    });

    it('should show only first child element', function() {
      var allChildren = $('> *', element);
      expect($(allChildren[1]).css('display')).toEqual('block');
      expect($(allChildren[2]).css('display')).toEqual('none');
    });

    describe("activating tab label", function() {

      beforeEach(inject(function ($compile, $rootScope) {
        scope.tabs.tab2.activate();
        scope.$apply();
      }));

      it('should activate second tab', function() {
        var lis = $('> ul > li', element);
        expect($(lis[1]).hasClass('active')).toBeTruthy();
        expect($(lis[0]).hasClass('active')).toBeFalsy();
      });

      it('should activate second first tab in scope', function() {
        expect(scope.tabs.tab2.active).toBeTruthy();
        expect(scope.tabs.tab1.active).toBeFalsy();
      });

      it('should show only second child element', function() {
        var allChildren = $('> *', element);
        expect($(allChildren[2]).css('display')).toEqual('block');
        expect($(allChildren[1]).css('display')).toEqual('none');
      });
    });
  });

  describe("adding multiple tabs, both active", function() {

    it('should throw error', function() {
      return inject(function($compile, $rootScope) {
        expect(function(){$compile("<div ui-tabs='{tab1:{active:true, label:\"foo\"}, tab2:{active:true, label:\"bar\"}}'><div></div><div></div></div>")($rootScope);}).toThrow();
      });
    });
  });

  describe("adding multiple tabs, second active", function() {

    var scope;
    var element;
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      element = $compile("<div ui-tabs='{tab1:{label:\"foo\"}, tab2:{active:true,label:\"bar\"}}'><div></div><div></div></div>")(scope);
      scope.$apply();
    }));

    it('should activate second tab', function() {
        var lis = $('> ul > li', element);
        expect($(lis[1]).hasClass('active')).toBeTruthy();
        expect($(lis[0]).hasClass('active')).toBeFalsy();
      });

      it('should activate second first tab in scope', function() {
        expect(scope.tabs.tab2.active).toBeTruthy();
        expect(scope.tabs.tab1.active).toBeFalsy();
      });

      it('should show only second child element', function() {
        var allChildren = $('> *', element);
        expect($(allChildren[2]).css('display')).toEqual('block');
        expect($(allChildren[1]).css('display')).toEqual('none');
      });
    });
  
  describe("changing tab label", function() {

    var scope;
    var element;
    beforeEach(inject(function ($compile, $rootScope) {
      scope = $rootScope.$new();
      element = $compile("<div ui-tabs='{tab1:{label:\"foo\"}}'><div></div></div>")(scope);
      scope.$apply();
      scope.tabs.tab1.label = "bar";
      scope.$apply();
    }));

    it('should use the new value as tab text', function() {
      expect($('> ul > li', element).text()).toEqual('bar');
    });
  });

  describe('adding ui-tabs without tab definitions', function() {

    it('should throw error', function() {
      return inject(function($compile, $rootScope) {

        expect(function(){$compile("<div ui-tabs></div>")($rootScope);}).toThrow();
      });
    });
  });

  describe('adding ui-tabs with non-matching tab definitions', function() {

    it('should throw error', function() {
      return inject(function($compile, $rootScope) {

        expect(function(){$compile("<div ui-tabs='{tab1:{label:\"foo\"}}'><div></div><div></div></div>")($rootScope);}).toThrow();
      });
    });
    
  });
});
