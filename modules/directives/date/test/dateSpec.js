/*global describe, beforeEach, it, inject, expect, module, $*/
describe('uiDate', function() {
  'use strict';
  var selectDate;
  selectDate = function(element, date) {
    element.datepicker('setDate', date);
    $.datepicker._selectDate(element);
  };
  beforeEach(module('ui.directives'));
  describe('simple use on input element', function() {
    it('should have a date picker attached', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile("<input ui-date/>")($rootScope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should put the date in the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });
  });
  describe('when model is not a Date', function() {
    var element;
    var scope;
    beforeEach(inject(function($compile, $rootScope) {
      element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
      scope = $rootScope;
    }));
    it('should not freak out when the model is null', function() {
      scope.$apply(function() {
        scope.x = null;
      });
      expect(element.datepicker('getDate')).toBe(null);
    });
    it('should not freak out when the model is undefined', function() {
      scope.$apply(function() {
        scope.x = undefined;
      });
      expect(element.datepicker('getDate')).toBe(null);
    });
    it('should throw an error if you try to pass in a boolean when the model is false', function() {
      expect(function() {
        scope.$apply(function() {
          scope.x = false;
        });
      }).toThrow();
    });
  });

  it('should update the input field correctly on a manual update', function() {
      inject(function($compile, $rootScope) {
          var dateString = '2012-08-17';
          var dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
          var element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($rootScope);
          $rootScope.$apply(function() {
              $rootScope.x = dateObj;
          });
          // Now change the data in the input box
          dateString = '2012-8-01';
          dateObj = $.datepicker.parseDate('yy-mm-dd', dateString);
          element.val(dateString);
          element.trigger("change");
          expect(element.datepicker('getDate')).toEqual(dateObj);
          expect(element.val()).toEqual('2012-08-01');
          $rootScope.$digest();
          expect($rootScope.x).toEqual(dateObj);
      });
  });

  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('simple use on a div element', function() {
    it('should have a date picker attached', function() {
      inject(function($compile, $rootScope) {
        var element;
        element = $compile("<div ui-date></div>")($rootScope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should put the date in the model', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect($rootScope.x).toEqual(aDate);
      });
    });
  });
  describe('use with ng-required directive', function() {
    it('should be invalid initially', function() {
      inject(function($compile, $rootScope) {
        var element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function() {
      inject(function($compile, $rootScope) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($rootScope);
        $rootScope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('when attribute options change', function() {
    it('should watch attribute and update date widget accordingly', function() {
      inject(function($compile, $rootScope) {
        var element;
        $rootScope.config = {
          minDate: 5
        };
        element = $compile("<input ui-date='config' ng-model='x'/>")($rootScope);
        $rootScope.$apply();
        expect(element.datepicker("option", "minDate")).toBe(5);
        $rootScope.$apply(function() {
          $rootScope.config.minDate = 10;
        });
        expect(element.datepicker("option", "minDate")).toBe(10);
      });
    });
  });

  describe('use with the ui-date-format directive', function() {
    it('should parse the date correctly from an ISO string', function() {
      inject(function($compile, $rootScope) {
        var aDateString, element;
        aDateString = (new Date(2012,8,17)).toISOString();
        element = $compile('<input ui-date ui-date-format ng-model="x"/>')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDateString;
        });
        expect($rootScope.x).toEqual(aDateString);
        expect($.datepicker.formatDate('yy-mm-dd', element.datepicker('getDate'))).toEqual('2012-09-17');
      });
    });
    it('should parse the date correctly from a custom string', function() {
      inject(function($compile, $rootScope) {
        var format = 'DD, d MM, yy';
        var aDateString = "Thursday, 11 October, 2012";
        var element = $compile('<input ui-date ui-date-format="'+ format + '" ng-model="x"/>')($rootScope);
        $rootScope.$apply(function() {
          $rootScope.x = aDateString;
        });
        expect($rootScope.x).toEqual(aDateString);
        expect($.datepicker.formatDate(format, element.datepicker('getDate'))).toEqual(aDateString);
        expect(element.datepicker('getDate')).toEqual(new Date(2012, 9, 11));
      });
    });
    it('should not freak out when the model is false', function() {
      inject(function($compile, $rootScope) {
         var aDateString, element;
          element = $compile('<input ui-date ui-date-format ng-model="x"/>')($rootScope);
          $rootScope.$apply(function() {
            $rootScope.x = false;
          });
          expect($rootScope.x).toBe(false);
          expect(element.datepicker('getDate')).toEqual(null);
      });
    });
    
    it('should not freak out when the model is undefined', function() {
      inject(function($compile, $rootScope) {
         var aDateString, element;
          element = $compile('<input ui-date ui-date-format ng-model="x"/>')($rootScope);
          $rootScope.$apply(function() {
            $rootScope.x = undefined;
          });
          expect($rootScope.x).toBe(undefined);
          expect(element.datepicker('getDate')).toEqual(null);
      });
    });
    
    it('should not freak out when the model is null', function() {
      inject(function($compile, $rootScope) {
         var aDateString, element;
          element = $compile('<input ui-date ui-date-format ng-model="x"/>')($rootScope);
          $rootScope.$apply(function() {
            $rootScope.x = null;
          });
          expect($rootScope.x).toBe(null);
          expect(element.datepicker('getDate')).toEqual(null);
      });
    });
  });
});
