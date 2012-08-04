describe('uiValidate', function ($compile) {
  var scope, compileAndDigest;

  beforeEach(module('ui'));
  beforeEach(inject(function ($rootScope, $compile) {
    
    scope = $rootScope.$new();
    compileAndDigest = function (inputHtml, scope) {

      var inputElm = angular.element(inputHtml);
      var formElm =  angular.element('<form name="form"></form>');
      formElm.append(inputElm);
      $compile(formElm)(scope);
      scope.$digest();

      return inputElm;
    };
  }));

  describe('initial validation', function () {

    it('should mark input as valid if initial model is valid', inject(function () {

      scope.validate = function () {
        return true
      };
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeTruthy();
      expect(scope.form.input.$error).toEqual({validator : false});
    }));

    it('should mark input as invalid if initial model is invalid', inject(function () {

      scope.validate = function () {
        return false
      };
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();
      expect(scope.form.input.$error).toEqual({ validator : true });
    }));
  });

  describe('validation on model change', function () {

    it('should change valid state in response to model changes', inject(function () {

      scope.value = false;
      scope.validate = function (valueToValidate) {
        return valueToValidate;
      };
      compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();

      scope.$apply('value = true');
      expect(scope.form.input.$valid).toBeTruthy();
    }));
  });

  describe('validation on element change', function () {

    var sniffer;
    beforeEach(inject(function ($sniffer) {
      sniffer = $sniffer;
    }));

    it('should change valid state in response to element events', inject(function () {

      scope.value = false;
      scope.validate = function (valueToValidate) {
        return valueToValidate;
      };
      var inputElm = compileAndDigest('<input name="input" ng-model="value" ui-validate="validate">', scope);
      expect(scope.form.input.$valid).toBeFalsy();

      inputElm.val('true');
      inputElm.trigger((sniffer.hasEvent('input') ? 'input' : 'change'));

      expect(scope.form.input.$valid).toBeTruthy();
    }));
  });

  describe('error cases', function () {
    it('should fail if ngModel not present', inject(function () {
      expect(function () {
        compileAndDigest('<input name="input" ui-validate="validate">', scope);
      }).toThrow(new Error('No controller: ngModel'));
    }));

    it('should fail with an exception if validate expression is not a function', inject(function () {
      expect(function () {
        compileAndDigest('<input name="input" ng-model="value" ui-validate="value">', scope);
      }).toThrow(new Error('uiValidate expression "value" is not a function.'));
    }));

    it('should have no effect if validate expression is empty', inject(function () {
      compileAndDigest('<input ng-model="value" ui-validate="">', scope);
    }));
  });
});
