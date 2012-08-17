  describe('uiCurrency', function() {
    var scope;
    scope = null;
    beforeEach(module('ui'));
    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
    }));

    describe('use on a div element with two-way binding', function() {
     it('should have ui-currency-pos style non-zero positive model number ', function() {
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
      it('should have ui-currency-neg style when negative model number', function() {
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
      it('should have ui-currency-zero style when zero model number', function() {
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
      it('should not have any ui-currency styles or a value at all when missing scope model value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency ng-model='aMissingNum'></div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      it('should not have any ui-currency styles or a value at all when provided a non-numeric model value', function() {
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
      
      it('should have user-defined positive style when provided in uiCurrency attr', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ pos:'pstyle' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 1;
          });
          expect(element.hasClass('pstyle')).toBeTruthy();
        });
      });

      it('should have big class when model is greater than certain positive value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ bignum:'100' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 100;
          });
          expect(element.hasClass('ui-bignum')).toBeTruthy();
        });
      });

      it('should not have big class when model is not greater than certain positive value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ bignum:'100' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 99;
          });
          expect(element.hasClass('ui-bignum')).toBeFalsy();
        });
      });

      it('should have small class when model is lesser than certain negative value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ smallnum:'-100' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = -100;
          });
          expect(element.hasClass('ui-smallnum')).toBeTruthy();
        });
      });

      it('should not have small class when model is not lesser than certain negative value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ smallnum:'-100' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = -99;
          });
          expect(element.hasClass('ui-smallnum')).toBeFalsy();
        });
      });

      it('should not have big or small class when model model is zero', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency=\"{ smallnum:'-100', bignum:'0' }\" ng-model='aNum'></div>")(scope);
          scope.$apply(function() {
            scope.aNum = 0;
          });
          expect(element.hasClass('ui-bignum')).toBeFalsy();
        });
      });

        it('should not have a small class when is-total attribute is set ', function() {
          inject(function($compile) {
            var element;
            element = $compile("<div ui-currency=\"{ smallnum:'-100' }\" is-total ng-model='aNum'></div>")(scope);
            scope.$apply(function() {
              scope.aNum = -100;
            });
            expect(element.hasClass('ui-smallnum')).toBeFalsy();
          });
        });


        it('should not have a big class when is-total attribute is set ', function() {
          inject(function($compile) {
            var element;
            element = $compile("<div ui-currency=\"{ bignum:'100' }\" is-total ng-model='aNum'></div>")(scope);
            scope.$apply(function() {
              scope.aNum = 100;
            });
            expect(element.hasClass('ui-bignum')).toBeFalsy();
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

    describe('use on a div element with curlies', function() {
      it('should have ui-currency-pos style non-zero positive number', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0.5123;
          element = $compile("<div ui-currency>{{aNum}}</div>")(scope);
          expect(element.text()).toEqual('$0.51');
          expect(element.hasClass('ui-currency-pos')).toBeTruthy();
        });
      });
      it('should have ui-currency-neg style when negative number', function() {
        inject(function($compile) {
          var element;
          scope.aNum = -123;
          element = $compile("<div ui-currency>{{aNum}}</div>")(scope);
          expect(element.text()).toEqual('($123.00)');
          expect(element.hasClass('ui-currency-neg')).toBeTruthy();
         });
      });
      it('should have ui-currency-zero style when zero', function() {
        inject(function($compile) {
          var element;
          scope.aNum = 0;
          element = $compile("<div ui-currency>{{aNum}}</div>")(scope);
          expect(element.text()).toEqual('$0.00');
          expect(element.hasClass('ui-currency-zero')).toBeTruthy();
        });
      });
      it('should not have any ui-currency styles or a value at all when missing scope model value', function() {
        inject(function($compile) {
          var element;
          element = $compile("<div ui-currency>{{aMissingNum}}</div>")(scope);
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      it('should not have any ui-currency styles or a value at all when provided a non-numeric number', function() {
        inject(function($compile) {
          var element;
          scope.aBadNum = 'bad';
          element = $compile("<div ui-currency>{{aBadNum}}</div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
      it('should not have any ui-currency styles or a value at all when provided an empty string', function() {
        inject(function($compile) {
          var element;
          scope.aBadNum = '      ';
          element = $compile("<div ui-currency>{{aBadNum}}</div>")(scope);
          expect(element.text()).toEqual('');
          expect(element.hasClass('ui-currency-pos')).toBeFalsy();
          expect(element.hasClass('ui-currency-neg')).toBeFalsy();
          expect(element.hasClass('ui-currency-zero')).toBeFalsy();
        });
      });
    });

  });

