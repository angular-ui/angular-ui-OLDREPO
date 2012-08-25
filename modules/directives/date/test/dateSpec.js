describe('uiDate', function () {
  'use strict';
  var selectDate, $scope;
  selectDate = function (element, date) {
    element.datepicker('setDate', date);
    $.datepicker._selectDate(element);
  };
  beforeEach(module('ui.directives'));
  beforeEach(inject(function ($rootScope) {
    $scope = $rootScope.$new();
  }));
  afterEach(function() {
    $scope.$destroy();
  });
  describe('simple use on input element', function () {
    it('should have a date picker attached', function () {
      inject(function ($compile) {
        var element;
        element = $compile("<input ui-date/>")($scope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($scope);
        $scope.$apply(function () {
          $scope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should put the date in the model', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x'/>")($scope);
        $scope.$apply();
        selectDate(element, aDate);
        expect($scope.x).toEqual(aDate);
      });
    });
  });
  it('should parse the date correctly from a string', function () {
    inject(function ($compile) {
      var aDate, aDateString, element;
      aDateString = "2012-08-17";
      element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($scope);
      $scope.$apply(function () {
        $scope.x = aDateString;
      });
      expect(element.datepicker('getDate').toISOString().substring(0, 10)).toEqual(aDateString);
      expect(element.datepicker('getDate').toTimeString()).not.toEqual(aDateString);
    });
  });
  it('should retain timezone information', function () {
    inject(function ($compile) {
      var aDateString, element;
      aDateString = '2012-08-17';
      element = $compile('<input ui-date="{dateFormat: \'yy-mm-dd\'}" ng-model="x"/>')($scope);
      $scope.$apply(function () {
        $scope.x = aDateString;
      });
      expect(element.datepicker('getDate').toISOString().substring(0, 10)).toEqual(aDateString);
    });
  });
  describe('use with ng-required directive', function () {
    it('should be invalid initially', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($scope);
        $scope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($scope);
        $scope.$apply(function () {
          $scope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<input ui-date ng-model='x' ng-required='true' />")($scope);
        $scope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
  describe('simple use on a div element', function () {
    it('should have a date picker attached', function () {
      inject(function ($compile) {
        var element;
        element = $compile("<div ui-date></div>")($scope);
        expect(element.datepicker()).toBeDefined();
      });
    });
    it('should be able to get the date from the model', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($scope);
        $scope.$apply(function () {
          $scope.x = aDate;
        });
        expect(element.datepicker('getDate')).toEqual(aDate);
      });
    });
    it('should put the date in the model', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x'></div>")($scope);
        $scope.$apply();
        selectDate(element, aDate);
        expect($scope.x).toEqual(aDate);
      });
    });
  });
  describe('use with ng-required directive', function () {
    it('should be invalid initially', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($scope);
        $scope.$apply();
        expect(element.hasClass('ng-invalid')).toBeTruthy();
      });
    });
    it('should be valid if model has been specified', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($scope);
        $scope.$apply(function () {
          $scope.x = aDate;
        });
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
    it('should be valid after the date has been picked', function () {
      inject(function ($compile) {
        var aDate, element;
        aDate = new Date(2010, 12, 1);
        element = $compile("<div ui-date ng-model='x' ng-required='true' ></div>")($scope);
        $scope.$apply();
        selectDate(element, aDate);
        expect(element.hasClass('ng-valid')).toBeTruthy();
      });
    });
  });
});
