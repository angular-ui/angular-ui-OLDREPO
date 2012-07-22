/*
 * sample unit testing for sample templates and implementations
*/
describe('uiTemplates', function() {

  // declare these up here to be global to all tests
  var $rootScope, $compile;

  // override uiConfig for testing purposes, this definition will clobber anything already predefined ... so be careful
  angular.module('ui.config', [])
    .value('ui.config', {
      'tmplFilter' : { 'someopt' : 'foo' }, 
      'wrapFilter' : { 'prefix' : 'cfoo-', 'suffix' : '-cbar' },
      'stylize' : {}
    });

  beforeEach(module('ui.directives'));
  beforeEach(module('ui.filters'));

  // inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
  // otherwise, you would need to inject these into each test
  beforeEach(inject(function(_$rootScope_, _$compile_, _$filter_) {
	  $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));
  
  describe('filter tests', function() {

	  // we're doing filter tests so globally define here for this subset of tests
	  var $filter;
	  beforeEach(inject(function(_$filter_) {
	      $filter = _$filter_;
	  }));
	  
    // very simple boilerplate setup of test for a custom filter
    describe('tmplFilter', function() {
      var tmpl;
      beforeEach(function() {
        tmpl = $filter('tmpl');
      });

      it('prove exists when provided', function() {
        expect(tmpl).toBeDefined();
      });
      
      it('should return exactly what interesting thing (or not) the filter is doing to input', function() {
        expect(tmpl('text')).toEqual('text');
      });

    });

    // a test suite for a custom filter that does something
	  describe('wrapFilter', function() {
	    var wrap;
	    beforeEach(function() {
	    	wrap = $filter('wrap');
	    });
	    
      // this is a good test to always have make sure it has been properly defined, no reason to bother with the rest
  		it('prove exists when provided', function() {
  			expect(wrap).toBeDefined();
  		});
  		
  		it('should return empty string for undefined/null/empty/missing values', function() {
  		  expect(wrap('')).toEqual('');
  		  expect(wrap(null)).toEqual('');
  		  expect(wrap(undefined)).toEqual('');
  		  expect(wrap()).toEqual('');
  		});
  		it('should properly wrap non-empty string without providing prefix/suffix', function() {
  		  expect(wrap('text')).toEqual('cfoo-text-cbar');
  		});
      it('should properly prefix non-empty string with prefix', function() {
        expect(wrap('text','foo-')).toEqual('foo-text');
      });
      it('should properly wrap non-empty string with both prefix and suffix', function() {
        expect(wrap('text','foo-','-bar')).toEqual('foo-text-bar');
      });
	  });
  });

  describe('directive tests', function() {
    var element;
    describe('uiTmpl', function() {
      it('should create an element if using Element-style', function() {
        var element = $compile('<ui-tmpl ng-model="a"></ui-tmpl>')($rootScope);
        expect(element).toBeDefined();
      });
      it('should render the models value in element', function() {
        var element = $compile('<div ui-tmpl ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = 'foo';
        $rootScope.$digest();
        expect(element.text()).toEqual('foo');
      });
    });

    describe('uiStylize', function() {
      it('should create an element if using Element-style', function() {
        var element = $compile('<ui-stylize ng-model="a"></ui-stylize>')($rootScope);
        expect(element).toBeDefined();
      });
      
      it('should render the  alphabetic model value in element and assign ui-alpha class', function() {
        var element = $compile('<div ui-stylize ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = 'foo';
        $rootScope.$digest();
        expect(element.text()).toEqual('foo');
        expect(element.hasClass('ui-alpha')).toBeTruthy('ui-alpha');
        expect(element.hasClass('ui-numeric')).toBeFalsy('ui-numeric');
      });
      it('should handle integer model value in element and assign ui-numeric class', function() {
        var element = $compile('<div ui-stylize ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = '123';
        $rootScope.$digest();
        expect(element.hasClass('ui-numeric')).toBeTruthy('ui-numeric');
        expect(element.hasClass('ui-alpha')).toBeFalsy('ui-alpha');
      });
      it('should handle float model value in element and assign ui-numeric class', function() {
        var element = $compile('<div ui-stylize ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = '123.000123';
        $rootScope.$digest();
        expect(element.hasClass('ui-numeric')).toBeTruthy('ui-numeric');
        expect(element.hasClass('ui-alpha')).toBeFalsy('ui-alpha');
      });
      it('should handle mixed alpha/numeric model value in element and assign ui-alpha class', function() {
        var element = $compile('<div ui-stylize ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = '123.000ABC';
        $rootScope.$digest();
        expect(element.hasClass('ui-numeric')).toBeFalsy('ui-numeric');
        expect(element.hasClass('ui-alpha')).toBeTruthy('ui-alpha');
      });
    });

  });

});
