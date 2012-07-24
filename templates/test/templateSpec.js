/*
 * sample unit testing for sample templates and implementations
*/
describe('uiTemplates', function() {

  // declare these up here to be global to all tests
  var $rootScope, $compile;

  // override uiConfig for testing purposes, this definition will clobber anything already predefined ... so be careful
  angular.module('ui.config', [])
    .value('ui.config', {
      'filterTmpl' : { 'somefilteropt' : 'foo' },
      'directiveTmpl' : { 'somedirectiveopt' : 'bar' }
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
    describe('filterTmpl should', function() {
      var tmpl;
      beforeEach(function() {
        tmpl = $filter('filterTmpl');
      });

      it('exist when provided', function() {
        expect(tmpl).toBeDefined();
      });
      
      it('return exactly what interesting thing the filter is doing to input', function() {
        expect(tmpl('text')).toEqual('text');
      });

    });
  });

  describe('directive tests', function() {
    var element;
    describe('uiDirectiveTmpl should', function() {
      it('create an element if using element-style', function() {
        var element = $compile('<ui-directive-tmpl ng-model="a"></ui-directive-tmpl>')($rootScope);
        expect(element).toBeDefined();
      });
      it('render the models value in element', function() {
        var element = $compile('<div ui-directive-tmpl ng-model="a"></div>')($rootScope);
        expect(element.text()).toEqual('');
        $rootScope.a = 'foo';
        $rootScope.$digest();
        expect(element.text()).toEqual('foo');
      });
    });

  });

});
