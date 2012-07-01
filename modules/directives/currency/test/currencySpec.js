  describe('uiCurrency', function() {
    var scope;
    scope = null;
    beforeEach(module('ui.directives'));
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
      it('(one-way) should have user-defined positive style when provided as attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1;
          element = $compile("<div ui-currency num='aNum' pos='pstyle'></div>")(scope);
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined negative style when provided as attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -1;
          element = $compile("<div ui-currency num='aNum' neg='nstyle'></div>")(scope);
          expect(element.hasClass('nstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined zero style when provided as attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          element = $compile("<div ui-currency num='aNum' zero='zstyle'></div>")(scope);
          expect(element.hasClass('zstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have use different symbol if provided as attr', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1.00;
          element = $compile("<div ui-currency num='aNum' symbol='*'></div>")(scope);
          expect(element.text()).toEqual('*1.00');
        });
      });
      it('(one-way) should have user-defined positive style when provided in controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1;
          scope.uiCurrencyOptions = {
            pos: 'pstyle'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")(scope);
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined negative style when provided in controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -1;
          scope.uiCurrencyOptions = {
            neg: 'nstyle'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")(scope);
          expect(element.hasClass('nstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined zero style when provided in controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          scope.uiCurrencyOptions = {
            zero: 'zstyle'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")(scope);
          expect(element.hasClass('zstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have use different symbol if provided in controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1.00;
          scope.uiCurrencyOptions = {
            symbol: '*'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")(scope);
          expect(element.text()).toEqual('*1.00');
        });
      });
      it('(one-way) should have user-defined positive style attribute override controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1;
          scope.uiCurrencyOptions = {
            pos: 'pstyle_DEFAULT'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' pos='pstyle'></div>")(scope);
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined negative style attribute override controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -1;
          scope.uiCurrencyOptions = {
            neg: 'nstyle_DEFAULT'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' neg='nstyle'></div>")(scope);
          expect(element.hasClass('nstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have user-defined zero style attribute override controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          scope.uiCurrencyOptions = {
            zero: 'zstyle_DEFAULT'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' zero='zstyle'></div>")(scope);
          expect(element.hasClass('zstyle')).toBeTruthy();
        });
      });
      it('(one-way) should have use different symbol attribute override controller options', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 1.00;
          scope.uiCurrencyOptions = {
            symbol: '*_DEFAULT'
          };
          element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' symbol='*'></div>")(scope);
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
    it('(two-way) should have user-defined positive style when provided as attr', function() {
      inject(function($compile) {
        var element;
        element = $compile("<div ui-currency ng-model='aNum' pos='pstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.hasClass('pstyle')).toBeTruthy();
      });
    });
    it('(two-way) should use different symbol if provided as attr', function() {
      inject(function($compile) {
        var element;
        element = $compile("<div ui-currency ng-model='aNum' symbol='*'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.text()).toEqual('*1.00');
      });
    });
    it('(two-way) should have user-defined zero style when provided as attr', function() {
      inject(function($compile) {
        var element;
        element = $compile("<div ui-currency ng-model='aNum' zero='zstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 0;
        });
        expect(element.hasClass('zstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined negative style when provided as attr', function() {
      inject(function($compile) {
        var element;
        element = $compile("<div ui-currency ng-model='aNum' neg='nstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = -1;
        });
        expect(element.hasClass('nstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined positive style when provided in controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          pos: 'pstyle'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.hasClass('pstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined zero style when provided in controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          zero: 'zstyle'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 0;
        });
        expect(element.hasClass('zstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined negative style when provided in controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          neg: 'nstyle'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = -1;
        });
        expect(element.hasClass('nstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have use different symbol if provided in controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          symbol: '*'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.text()).toEqual('*1.00');
      });
    });
    it('(two-way) should have user-defined positive style attribute override controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          pos: 'pstyle_DEFAULT'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' pos='pstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.hasClass('pstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined negative style attribute override controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          neg: 'nstyle_DEFAULT'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' neg='nstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = -1;
        });
        expect(element.hasClass('nstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have user-defined zero style attribute override controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          zero: 'zstyle_DEFAULT'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' zero='zstyle'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 0;
        });
        expect(element.hasClass('zstyle')).toBeTruthy();
      });
    });
    it('(two-way) should have use different symbol attribute override controller options', function() {
      inject(function($compile) {
        var element;
        scope.uiCurrencyOptions = {
          symbol: '*_DEFAULT'
        };
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' symbol='*'></div>")(scope);
        scope.$apply(function() {
          scope.aNum = 1;
        });
        expect(element.text()).toEqual('*1.00');
      });
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
