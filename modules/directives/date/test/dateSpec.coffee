describe 'uiDate', ()->
  # Simulate a date being selected on the date picker widget
  selectDate = (element, date)->
    element.datepicker('setDate', date)
    $.datepicker._selectDate(element)

  # Ensure the datepicker angular module is loaded
  beforeEach module 'ui.directives.date'

  describe 'simple use on input element', ()->

    it 'should have a date picker attached', ()->
      inject ($compile, $rootScope)->
        element = $compile("<input ui-date></input>")($rootScope)
        expect(element.datepicker()).toBeDefined()

    it 'should be able to get the date from the model', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<input ui-date ng-model='x'></input>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.x = aDate
        expect(element.datepicker('getDate')).toEqual(aDate)

    it 'should put the date in the model', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<input ui-date ng-model='x'></input>")($rootScope)
        selectDate(element, aDate)
        expect($rootScope.x).toEqual(aDate)

  describe 'use with ng-required directive', ()->
    it 'should be invalid initially', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope)
        # Do an apply to ensure that the validation is run
        $rootScope.$apply()
        expect(element.hasClass('ng-invalid')).toBeTruthy()

    it 'should be valid if model has been specified', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.x = aDate
        expect(element.hasClass('ng-valid')).toBeTruthy()

    it 'should be valid after the date has been picked', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<input ui-date ng-model='x' ng-required='true' ></input>")($rootScope)
        selectDate(element, aDate)
        expect(element.hasClass('ng-valid')).toBeTruthy()

  describe 'simple use on a div element', ()->

    it 'should have a date picker attached', ()->
      inject ($compile, $rootScope)->
        element = $compile("<div ui-date></div>")($rootScope)
        expect(element.datepicker()).toBeDefined()

    it 'should be able to get the date from the model', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.x = aDate
        expect(element.datepicker('getDate')).toEqual(aDate)

    it 'should put the date in the model', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope)
        selectDate(element, aDate)
        expect($rootScope.x).toEqual(aDate)

  describe 'use with ng-required directive', ()->
    it 'should be invalid initially', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope)
        # Do an apply to ensure that the validation is run
        $rootScope.$apply()
        expect(element.hasClass('ng-invalid')).toBeTruthy()

    it 'should be valid if model has been specified', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope)
        $rootScope.$apply ()->
          $rootScope.x = aDate
        expect(element.hasClass('ng-valid')).toBeTruthy()

    it 'should be valid after the date has been picked', ()->
      inject ($compile, $rootScope)->
        aDate = new Date(2010,12,1)
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope)
        selectDate(element, aDate)
        expect(element.hasClass('ng-valid')).toBeTruthy()
