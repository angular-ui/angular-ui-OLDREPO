  describe('uiTemplate', function() {
    var scope;
    scope = null;
    beforeEach(module('ui.directives'));
    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));
    describe('use on a div element with two-way binding', function() {
      it('(two-way) should render MODELVAL in template ', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-template ng-model='mymodel'></div>")(scope);
          scope.$apply(function() {
            scope.mymodel = 'MODELVAL';
          });
          expect(element.text()).toEqual('MODELVAL');
        });
      });
      // TODO: Need test for checking default attribute values
    });
    describe('use on a div element with one-way binding', function() {
      it('(one-way) should render someattr value in template', function() {
        inject(function($compile) {
          var element;
          scope.mymodel = 'ATTRVAL';
          element = $compile("<div ui-template somemodel='mymodel'></div>")(scope);
          expect(element.text()).toEqual('ATTRVAL');
        });
      });
    });
    describe('use as tag with two-way binding', function() {
      it('(two-way) should render MODELVAL in template ', function() {
        inject(function($compile) {
          var element;
          element = $compile("<ui-template ng-model='mymodel'></ui-template>")(scope);
          scope.$apply(function() {
            scope.mymodel = 'MODELVAL';
          });
          expect(element.text()).toEqual('MODELVAL');
        });
      });
    });
  });
