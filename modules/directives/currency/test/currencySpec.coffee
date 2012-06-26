describe 'uiCurrency', ()->

  # Ensure the angular modules are loaded
  beforeEach module 'ui.directives'

  describe 'use on a div element with one-way binding', ()->

    it '(one-way) should have ui-currency-pos style non-zero positive number ', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 0.5123
        element = $compile("<div ui-currency num='aNum'></div>")($rootScope)
        expect(element.text()).toEqual('$0.51')
        expect(element.hasClass('ui-currency-pos')).toBeTruthy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()
        
    it '(one-way) should have ui-currency-neg style when negative number', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = -123
        element = $compile("<div ui-currency num='aNum'></div>")($rootScope)
        expect(element.text()).toEqual('($123.00)')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeTruthy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()

    it '(one-way) should have ui-currency-zero style when zero number', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 0
        element = $compile("<div ui-currency num='aNum'></div>")($rootScope)
        expect(element.text()).toEqual('$0.00')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeTruthy()

    it '(one-way) should not have any ui-currency styles or a value at all when missing scope value', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency num='aMissingNum'></div>")($rootScope)
        expect(element.text()).toEqual('')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()

    it '(one-way) should not have any ui-currency styles or a value at all when provided a non-numeric', ()->
      inject ($compile, $rootScope)->
        $rootScope.aBadNum = 'bad'
        element = $compile("<div ui-currency num='aBadNum'></div>")($rootScope)
        expect(element.text()).toEqual('')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()
  
    it '(one-way) should have user-defined positive style when provided as attr', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1
        element = $compile("<div ui-currency num='aNum' pos='pstyle'></div>")($rootScope)
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(one-way) should have user-defined negative style when provided as attr', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = -1
        element = $compile("<div ui-currency num='aNum' neg='nstyle'></div>")($rootScope)
        expect(element.hasClass('nstyle')).toBeTruthy()

    it '(one-way) should have user-defined zero style when provided as attr', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 0
        element = $compile("<div ui-currency num='aNum' zero='zstyle'></div>")($rootScope)
        expect(element.hasClass('zstyle')).toBeTruthy()
         
    it '(one-way) should have use different symbol if provided as attr', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1.00
        element = $compile("<div ui-currency num='aNum' symbol='*'></div>")($rootScope)
        expect(element.text()).toEqual('*1.00')
            
    it '(one-way) should have user-defined positive style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1
        $rootScope.uiCurrencyOptions = { pos: 'pstyle' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(one-way) should have user-defined negative style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = -1
        $rootScope.uiCurrencyOptions = { neg: 'nstyle' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        expect(element.hasClass('nstyle')).toBeTruthy()

    it '(one-way) should have user-defined zero style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 0
        $rootScope.uiCurrencyOptions = { zero: 'zstyle' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        expect(element.hasClass('zstyle')).toBeTruthy()
         
    it '(one-way) should have use different symbol if provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1.00
        $rootScope.uiCurrencyOptions = { symbol: '*' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        expect(element.text()).toEqual('*1.00')
        
    it '(one-way) should have user-defined positive style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1
        $rootScope.uiCurrencyOptions = { pos: 'pstyle_DEFAULT' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' pos='pstyle'></div>")($rootScope)
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(one-way) should have user-defined negative style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = -1
        $rootScope.uiCurrencyOptions = { neg: 'nstyle_DEFAULT' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' neg='nstyle'></div>")($rootScope)
        expect(element.hasClass('nstyle')).toBeTruthy()

    it '(one-way) should have user-defined zero style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 0
        $rootScope.uiCurrencyOptions = { zero: 'zstyle_DEFAULT' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' zero='zstyle'></div>")($rootScope)
        expect(element.hasClass('zstyle')).toBeTruthy()
         
    it '(one-way) should have use different symbol attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.aNum = 1.00
        $rootScope.uiCurrencyOptions = { symbol: '*_DEFAULT' }
        element = $compile("<div ui-currency num='aNum' options='uiCurrencyOptions' symbol='*'></div>")($rootScope)
        expect(element.text()).toEqual('*1.00')

  describe 'use on a div element with two-way binding', ()->

    it '(two-way) should have ui-currency-pos style non-zero positive model number ', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 0.5123
        expect(element.text()).toEqual('$0.51')
        expect(element.hasClass('ui-currency-pos')).toBeTruthy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()
        
  it '(two-way) should have ui-currency-neg style when negative model number', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = -123
        expect(element.text()).toEqual('($123.00)')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeTruthy()
    
    it '(two-way) should have ui-currency-zero style when zero model number', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 0
        expect(element.text()).toEqual('$0.00')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeTruthy()
        
    it '(two-way) should not have any ui-currency styles or a value at all when missing scope model value', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aMissingNum'></div>")($rootScope)
        expect(element.text()).toEqual('')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()

    it '(two-way) should not have any ui-currency styles or a value at all when provided a non-numeric model value', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aBadNum'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aBadNum = 'bad'
        expect(element.text()).toEqual('')
        expect(element.hasClass('ui-currency-pos')).toBeFalsy()
        expect(element.hasClass('ui-currency-neg')).toBeFalsy()
        expect(element.hasClass('ui-currency-zero')).toBeFalsy()

    it '(two-way) should have user-defined positive style when provided as attr', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum' pos='pstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(two-way) should use different symbol if provided as attr', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum' symbol='*'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.text()).toEqual('*1.00')

    it '(two-way) should have user-defined zero style when provided as attr', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum' zero='zstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 0
        expect(element.hasClass('zstyle')).toBeTruthy()
 
    it '(two-way) should have user-defined negative style when provided as attr', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-currency ng-model='aNum' neg='nstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = -1
        expect(element.hasClass('nstyle')).toBeTruthy()
            
    it '(two-way) should have user-defined positive style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { pos: 'pstyle' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(two-way) should have user-defined zero style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { zero: 'zstyle' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 0
        expect(element.hasClass('zstyle')).toBeTruthy()
 
    it '(two-way) should have user-defined negative style when provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { neg: 'nstyle' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = -1
        expect(element.hasClass('nstyle')).toBeTruthy()
    
    it '(two-way) should have use different symbol if provided in controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { symbol: '*' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.text()).toEqual('*1.00')
        
    it '(two-way) should have user-defined positive style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { pos: 'pstyle_DEFAULT' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' pos='pstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.hasClass('pstyle')).toBeTruthy()

    it '(two-way) should have user-defined negative style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { neg: 'nstyle_DEFAULT' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' neg='nstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = -1      
        expect(element.hasClass('nstyle')).toBeTruthy()

    it '(two-way) should have user-defined zero style attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { zero: 'zstyle_DEFAULT' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' zero='zstyle'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 0
        expect(element.hasClass('zstyle')).toBeTruthy()
         
    it '(two-way) should have use different symbol attribute override controller options', ()->
      inject ($compile, $rootScope)->
        $rootScope.uiCurrencyOptions = { symbol: '*_DEFAULT' }
        element = $compile("<div ui-currency ng-model='aNum' options='uiCurrencyOptions' symbol='*'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.aNum = 1
        expect(element.text()).toEqual('*1.00')
 