
describe('uiDate', function() {
  var selectDate;
  selectDate = function(element, date) {
    element.datepicker('setDate', date);
    return $.datepicker._selectDate(element);
  };
  beforeEach(module('ui.directives'));
  describe('simple use on input element', function() {
    it('should have a date picker attached', function() {
      return inject(function($compile, $rootScope) {
        var element;
        element = $compile("<input ui-date/>")($rootScope);
        return expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($rootScope);
        $rootScope.$apply(function() {
          return $rootScope.x = aDate;
        });
        return expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    return it('should put the date in the model', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        return expect($rootScope.x).toEqual(aDate);
      });
    });
  });
  it('should parse the date correctly from a string', function() {
    return inject(function($compile, $rootScope) {
      var aDateString, element;
      aDateString = '2012-08-17';
      element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
      $rootScope.$apply(function() {
        return $rootScope.x = aDateString;
      });
      return expect(element.datepicker('getDate').toISOString().substring(0, 10)).toEqual(aDateString);
    });
  });
  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply();
        return expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply(function() {
          return $rootScope.x = aDate;
        });
        return expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    return it('should be valid after the date has been picked', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        return expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('simple use on a div element', function() {
    it('should have a date picker attached', function() {
      return inject(function($compile, $rootScope) {
        var element;
        element = $compile("<div ui-date></div>")($rootScope);
        return expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
        $rootScope.$apply(function() {
          return $rootScope.x = aDate;
        });
        return expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    return it('should put the date in the model', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        return expect($rootScope.x).toEqual(aDate);
      });
    });
  });
  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply();
        return expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply(function() {
          return $rootScope.x = aDate;
        });
        return expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    return it('should be valid after the date has been picked', function() {
      return inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        return expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  return describe('when attribute options change', function() {
    return it('should watch attribute and update date widget accordingly', function() {
      return inject(function($compile, $rootScope) {
        var element;
        $rootScope.config = {
          minDate: 5
        };
        element = $compile("<input ui-date='config' ng-model='x'/>")($rootScope);
        $rootScope.$apply();
        expect(element.datepicker("option", "minDate")).toBe(5);
        $rootScope.$apply(function() {
          return $rootScope.config.minDate = 10;
        });
        return expect(element.datepicker("option", "minDate")).toBe(10);
      });
    });
  });
});
