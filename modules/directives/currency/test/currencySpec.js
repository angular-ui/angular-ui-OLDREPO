  describe('uiCurrency', function() {
    var scope;
    scope = null,
    uiConfig = {};
    beforeEach(module('ui'));
    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));
    describe('use on a div element with one-way binding', function() {
      it('(one-way) should have ui-currency-pos style non-zero positive number ', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0.5123;
          element = $compile("<div ui-currency num='aNum'></div>")(scope);
          expect(element.text()).toEqual('$0.51');
          expect(element.hasClass('ui-currency-pos')).toBeTruthy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
     
      it('(one-way) should have ui-currency-neg style when negative number', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -123;
          element = $compile("<div ui-currency num='aNum'></div>")(scope);
          expect(element.text()).toEqual('($123.00)');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeTruthy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
     
      it('(one-way) should have ui-currency-zero style when zero number', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          element = $compile("<div ui-currency num='aNum'></div>")(scope);
          expect(element.text()).toEqual('$0.00');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeTruthy();
        });
      });
     
      it('(one-way) should not have any ui-currency styles or a value at all when missing scope value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency num='aMissingNum'></div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      
      it('(one-way) should not have any ui-currency styles or a value at all when provided a non-numeric', function() {
        inject(function($compile) {
          var element;
          scope.aBadNum = 'bad';
          element = $compile("<div ui-currency num='aBadNum'></div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      
      it('(one-way) should have user-defined positive style when provided in uiCurrency attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1;
          element = $compile("<div ui-currency=\"{ pos:'pstyle', neg:'nstyle' }\" num='aNum' ></div>")(scope);
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });
      
      it('(one-way) should have user-defined negative style when provided in uiCurrency attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -1;
          element = $compile("<div ui-currency=\"{ neg:'nstyle' }\" num='aNum' ></div>")(scope);
          expect(element.hasClass('nstyle')).toBeTruthy();
        });
      });
     
      it('(one-way) should have user-defined zero style when provided in uiCurrency attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          element = $compile("<div ui-currency=\"{ zero:'zstyle' }\" num='aNum'></div>")(scope);
          expect(element.hasClass('zstyle')).toBeTruthy();
        });
      });
     
      it('(one-way) should have use different symbol if provided as attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1.00;
          element = $compile("<div ui-currency=\"{ symbol:'*' }\" num='aNum' ></div>")(scope);
          expect(element.text()).toEqual('*1.00');
        });
      });
    });
    describe('use on a div element with two-way binding', function() {
     it('(two-way) should have ui-currency-pos style non-zero positive model number ', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 0.5123;
          });
          expect(element.text()).toEqual('$0.51');
          expect(element.hasClass('ui-currency-pos')).toBeTruthy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      it('(two-way) should have ui-currency-neg style when negative model number', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = -123;
          });
          expect(element.text()).toEqual('($123.00)');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeTruthy();
         });
      });
      it('(two-way) should have ui-currency-zero style when zero model number', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 0;
          });
          expect(element.text()).toEqual('$0.00');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeTruthy();
        });
      });
      it('(two-way) should not have any ui-currency styles or a value at all when missing scope model value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aMissingNum'></div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      it('(two-way) should not have any ui-currency styles or a value at all when provided a non-numeric model value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aBadNum'></div>")(scope);
          scope.$apply(function() {
            scope.aBadNum = 'bad';
          });
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      
      it('(two-way) should have user-defined positive style when provided in uiCurrency attr', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ pos:'pstyle' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 1;
          });
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });
      // Presumption is if above works then no need to test other cases, given the coverage in previous describe
    });
    describe('use on a tag element', function() {
      it('should have a defined element', function() {
        inject(function($compile) {
          var element;
          element = $compile("<ui-currency ng-model='aNum'></ui-currency>")(scope);
          scope.$apply(function() {
            scope.aNum = 1;
          });
          expect(element).toBeDefined();
          expect(element.text()).toEqual('$1.00');
        });
      });
    });
  });
